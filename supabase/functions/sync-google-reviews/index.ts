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

    const googleRefreshToken = Deno.env.get("GOOGLE_REFRESH_TOKEN");
    const googleClientId = Deno.env.get("GOOGLE_CLIENT_ID");
    const googleClientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET");
    const googleLocationId = Deno.env.get("GOOGLE_LOCATION_ID");

    if (!googleRefreshToken || !googleClientId || !googleClientSecret || !googleLocationId) {
      throw new Error("Missing required Google API credentials in environment variables");
    }

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: googleClientId,
        client_secret: googleClientSecret,
        refresh_token: googleRefreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Failed to refresh Google access token: ${await tokenResponse.text()}`);
    }

    const { access_token } = await tokenResponse.json();

    const reviewsResponse = await fetch(
      `https://mybusiness.googleapis.com/v4/${googleLocationId}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
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
      .eq("integration_type", "business_profile");

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
