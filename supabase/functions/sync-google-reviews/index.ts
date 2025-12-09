import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface GoogleReview {
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  starRating: string;
  comment?: string;
  createTime: string;
  updateTime: string;
  reviewReply?: {
    comment: string;
    updateTime: string;
  };
}

interface GoogleIntegration {
  id: string;
  access_token: string;
  refresh_token: string;
  token_expires_at: string;
  location_id: string;
  is_active: boolean;
}

async function refreshAccessToken(
  supabase: ReturnType<typeof createClient>,
  integration: GoogleIntegration,
  clientId: string,
  clientSecret: string
): Promise<string> {
  const tokenExpiresAt = new Date(integration.token_expires_at);
  const now = new Date();
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);

  if (tokenExpiresAt > fiveMinutesFromNow) {
    return integration.access_token;
  }

  console.log('Token expired or expiring soon, refreshing...');

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: integration.refresh_token,
      grant_type: 'refresh_token',
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`Failed to refresh token: ${await tokenResponse.text()}`);
  }

  const { access_token, expires_in } = await tokenResponse.json();
  const newExpiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

  await supabase
    .from('google_integrations')
    .update({
      access_token,
      token_expires_at: newExpiresAt,
      updated_at: new Date().toISOString(),
    })
    .eq('id', integration.id);

  return access_token;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const logId = crypto.randomUUID();
    
    await supabase.from("review_sync_log").insert({
      id: logId,
      sync_started_at: new Date().toISOString(),
      status: "running",
    });

    const { data: integration, error: integrationError } = await supabase
      .from('google_integrations')
      .select('*')
      .eq('integration_type', 'business_profile')
      .eq('is_active', true)
      .maybeSingle();

    if (integrationError || !integration) {
      throw new Error('Google Business Profile integration not found or inactive. Please connect your account.');
    }

    if (!integration.refresh_token) {
      throw new Error('No refresh token found. Please reconnect your Google account.');
    }

    if (!integration.location_id) {
      throw new Error('No location ID configured. Please set up your Google Business Profile location.');
    }

    const googleClientId = Deno.env.get("GOOGLE_CLIENT_ID");
    const googleClientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET");

    if (!googleClientId || !googleClientSecret) {
      throw new Error("Google OAuth credentials not configured");
    }

    const accessToken = await refreshAccessToken(
      supabase,
      integration as GoogleIntegration,
      googleClientId,
      googleClientSecret
    );

    const reviewsResponse = await fetch(
      `https://mybusiness.googleapis.com/v4/${integration.location_id}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!reviewsResponse.ok) {
      throw new Error(`Failed to fetch reviews: ${await reviewsResponse.text()}`);
    }

    const reviewsData = await reviewsResponse.json();
    const reviews: GoogleReview[] = reviewsData.reviews || [];

    let newCount = 0;
    let updatedCount = 0;

    for (const review of reviews) {
      const rating = parseInt(review.starRating.replace("STAR_RATING_UNSPECIFIED", "0").replace("FIVE", "5").replace("FOUR", "4").replace("THREE", "3").replace("TWO", "2").replace("ONE", "1"));

      const reviewData = {
        google_review_id: review.reviewId,
        rating,
        author_name: review.reviewer.displayName,
        author_photo_url: review.reviewer.profilePhotoUrl || null,
        review_text: review.comment || null,
        review_date: new Date(review.createTime).toISOString(),
        response_text: review.reviewReply?.comment || null,
        response_date: review.reviewReply?.updateTime ? new Date(review.reviewReply.updateTime).toISOString() : null,
        is_responded: !!review.reviewReply,
        updated_at: new Date().toISOString(),
      };

      const { data: existing } = await supabase
        .from("google_reviews")
        .select("id")
        .eq("google_review_id", review.reviewId)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("google_reviews")
          .update(reviewData)
          .eq("id", existing.id);
        updatedCount++;
      } else {
        await supabase.from("google_reviews").insert(reviewData);
        newCount++;
      }
    }

    await supabase
      .from("review_sync_log")
      .update({
        sync_completed_at: new Date().toISOString(),
        reviews_fetched: reviews.length,
        reviews_new: newCount,
        reviews_updated: updatedCount,
        status: "success",
      })
      .eq("id", logId);

    await supabase
      .from("google_integrations")
      .update({ last_synced_at: new Date().toISOString() })
      .eq("id", integration.id);

    return new Response(
      JSON.stringify({
        success: true,
        totalReviews: reviews.length,
        newReviews: newCount,
        updatedReviews: updatedCount,
        syncedAt: new Date().toISOString(),
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error syncing reviews:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to sync reviews" }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
});
