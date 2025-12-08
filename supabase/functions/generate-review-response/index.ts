import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ReviewResponseRequest {
  reviewId: string;
  reviewText: string;
  rating: number;
  authorName: string;
  tone?: 'grateful' | 'professional' | 'empathetic' | 'friendly';
  useModel?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { reviewId, reviewText, rating, authorName, tone = 'professional', useModel }: ReviewResponseRequest = await req.json();

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    const defaultModel = Deno.env.get("OPENAI_MODEL_REVIEW_RESPONSE") || "gpt-4o-mini";
    const model = useModel || defaultModel;

    if (!openaiApiKey) {
      console.warn("No OpenAI API key found, using fallback mock response");
      const mockResponse = generateMockResponse(rating, authorName, reviewText);
      return new Response(
        JSON.stringify({
          reviewId,
          generatedResponse: mockResponse,
          tone,
          model: "mock",
          confidence: 0.75,
          usedFallback: true,
          suggestedEdits: ["OpenAI API not configured - using fallback response"]
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    const toneGuidelines = {
      grateful: "Express genuine gratitude and enthusiasm. Use warm, appreciative language.",
      professional: "Maintain a formal, respectful tone. Be courteous and helpful.",
      empathetic: "Show understanding and compassion. Acknowledge concerns sincerely.",
      friendly: "Be warm and personable. Use conversational language while remaining professional."
    };

    const ratingContext = rating >= 4
      ? "This is a positive review. Express appreciation and reinforce positive elements."
      : rating === 3
      ? "This is a neutral review. Thank them for feedback and offer to address concerns."
      : "This is a negative review. Apologize sincerely and offer to resolve issues directly.";

    const systemPrompt = `You are a professional response writer for Mango Law LLC, a criminal defense law firm in Delaware, Ohio.

Your task is to generate a thoughtful, personalized response to a client review.

Tone: ${toneGuidelines[tone]}
Context: ${ratingContext}

Guidelines:
- Address the reviewer by name (${authorName})
- Keep responses between 50-150 words
- Be authentic and genuine
- For positive reviews: Express gratitude and highlight specific positive points mentioned
- For neutral reviews: Thank them and offer to discuss concerns
- For negative reviews: Apologize sincerely, take responsibility, and provide direct contact info (740) 201-1444
- Always maintain professionalism
- Reference the firm's commitment to client service
- Do NOT make promises you can't keep
- Do NOT argue or be defensive

Review text: "${reviewText}"
Rating: ${rating}/5 stars

Generate ONLY the response text, no preamble or explanation.`;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Please write a ${tone} response to this review.` }
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error("OpenAI API error:", errorText);
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const openaiData = await openaiResponse.json();
    const generatedResponse = openaiData.choices[0].message.content.trim();

    const confidence = rating >= 4 ? 0.92 : rating === 3 ? 0.85 : 0.80;
    const wordCount = generatedResponse.split(/\s+/).length;
    const suggestedEdits = [];

    if (wordCount < 40) {
      suggestedEdits.push("Consider adding more personalization");
    }
    if (wordCount > 180) {
      suggestedEdits.push("Consider shortening for better readability");
    }
    if (rating <= 2 && !generatedResponse.includes("740")) {
      suggestedEdits.push("Add direct contact number for urgent cases");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from("ai_model_config").update({
      usage_count: supabase.rpc("increment", { x: 1 })
    }).eq("use_case", "review_response").eq("model_name", model);

    const response = {
      reviewId,
      generatedResponse,
      tone,
      model,
      confidence,
      usedFallback: false,
      suggestedEdits,
      wordCount,
    };

    return new Response(
      JSON.stringify(response),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error generating review response:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate response' }),
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

function generateMockResponse(rating: number, authorName: string, reviewText: string): string {
  if (rating >= 4) {
    return `Thank you so much for taking the time to share your positive experience, ${authorName}! We're thrilled that we could help you achieve a favorable outcome in your case. Your trust in our legal team means everything to us. At Mango Law, we're committed to providing exceptional representation and personalized attention to every client. If you ever need our services again or have questions, please don't hesitate to reach out. We're here for you!`;
  } else if (rating === 3) {
    return `Thank you for your feedback, ${authorName}. We appreciate you taking the time to share your experience with our firm. We're always looking to improve our services and would welcome the opportunity to discuss your concerns in more detail. Your satisfaction is important to us, and we'd like to ensure any issues are addressed properly. Please feel free to contact our office directly at (740) 201-1444 so we can work together to resolve any outstanding matters.`;
  } else {
    return `${authorName}, thank you for bringing this to our attention. We take all feedback seriously and are genuinely sorry to hear that your experience with Mango Law didn't meet your expectations. This is not the standard of service we strive to provide. We'd like the opportunity to discuss this with you directly and work toward a resolution. Please contact our office at (740) 201-1444 at your earliest convenience. Your concerns matter to us, and we're committed to making this right.`;
  }
}
