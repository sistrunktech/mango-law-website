import { fal } from "@fal-ai/client";

function getFalKey() {
  return process.env.FAL_KEY || process.env.FAL_API_KEY || process.env.FALAI_API_KEY;
}

export const falEnabled = Boolean(getFalKey());

export async function generateImage({
  prompt,
  width = 1200,
  height = 630,
  seed,
  model = "fal-ai/flux-pro",
}: {
  prompt: string;
  width?: number;
  height?: number;
  seed?: number;
  model?: string;
}) {
  const falKey = getFalKey();
  if (!falKey) throw new Error("fal.ai is not configured (missing FAL_KEY)");

  fal.config({ credentials: falKey });

  const result = await fal.run(model, {
    input: { prompt, width, height, seed },
  });

  const url =
    result?.images?.[0]?.url ||
    result?.data?.images?.[0]?.url ||
    result?.data?.image?.url;

  if (!url) throw new Error("fal: no image URL returned");

  const res = await fetch(url);
  if (!res.ok) throw new Error(`fal: image fetch failed (${res.status})`);

  const buffer = Buffer.from(await res.arrayBuffer());
  return { buffer, format: "png" as const, url, model };
}
