import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { reviewId, reviewText, rating, authorName, tone = 'professional' }: ReviewResponseRequest = await req.json();

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
Rating: ${rating}/5 stars`;

    const mockResponse = generateMockResponse(rating, authorName, reviewText);

    const response = {
      reviewId,
      generatedResponse: mockResponse,
      tone,
      confidence: 0.85 + (Math.random() * 0.15),
      suggestedEdits: [
        "Consider personalizing the opening",
        "Add specific reference to their case type if known"
      ]
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
