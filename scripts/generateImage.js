#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import process from "process";
import fal from "@fal-ai/client";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const modelsPreference = [
  "fal-ai/recraft-v3",
  "fal-ai/stable-diffusion-v35-large",
  "fal-ai/flux/dev",
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function ensureEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

async function downloadToBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download image: ${res.status} ${res.statusText}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function generateImage(prompt) {
  const apiKey = ensureEnv("FAL_API_KEY");
  fal.config({ credentials: apiKey });

  let result;
  for (const model of modelsPreference) {
    try {
      result = await fal.subscribe(model, {
        input: {
          prompt,
        },
      });
      if (result) {
        result.model = model;
        break;
      }
    } catch (err) {
      console.warn(`Model ${model} failed, trying next. Error: ${err.message}`);
    }
  }

  if (!result) {
    throw new Error("All models failed to generate an image.");
  }

  const imageUrl =
    result.images?.[0]?.url ||
    result.data?.image?.url ||
    result.data?.images?.[0]?.url;

  if (!imageUrl) {
    throw new Error("No image URL returned from FAL response.");
  }

  return {
    imageUrl,
    model: result.model || result.model_name || "unknown",
    seed: result.seed || result.images?.[0]?.seed,
    prompt: result.prompt || prompt,
    raw: result,
  };
}

async function uploadToSupabase(buffer, filePath, prompt, meta) {
  const supabaseUrl = ensureEnv("SUPABASE_URL");
  const supabaseKey = ensureEnv("SERVICE_ROLE_KEY");
  const supabase = createClient(supabaseUrl, supabaseKey);

  const bucket = "generated-images";
  const { error } = await supabase.storage.from(bucket).upload(filePath, buffer, {
    cacheControl: "3600",
    contentType: "image/png",
    upsert: true,
  });
  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  const metaPath = filePath.replace(/\.png$/, ".json");
  const { error: metaError } = await supabase.storage
    .from(bucket)
    .upload(metaPath, JSON.stringify(meta, null, 2), {
      cacheControl: "3600",
      contentType: "application/json",
      upsert: true,
    });
  if (metaError) {
    console.warn(`Supabase metadata upload failed: ${metaError.message}`);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}

async function saveLocal(buffer, fileName, meta) {
  const outDir = path.join(process.cwd(), "public", "generated");
  await fs.mkdir(outDir, { recursive: true });
  const filePath = path.join(outDir, fileName);
  await fs.writeFile(filePath, buffer);

  const metaPath = path.join(
    outDir,
    fileName.replace(/\.png$/, ".json"),
  );
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2));

  return { localPath: `/generated/${fileName}`, metaPath };
}

async function main() {
  const args = process.argv.slice(2);
  const promptArgIndex = args.findIndex((a) => a === "--prompt");
  const prompt =
    promptArgIndex !== -1 && args[promptArgIndex + 1]
      ? args[promptArgIndex + 1]
      : args.join(" ").trim();

  if (!prompt) {
    console.error("Usage: npm run generate:image -- --prompt \"your prompt here\"");
    process.exit(1);
  }

  console.log(`Generating image for prompt: "${prompt}"`);
  const result = await generateImage(prompt);
  const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  const fileBase = `${slugify(prompt) || "image"}-${timestamp}`;
  const fileName = `${fileBase}.png`;

  const buffer = await downloadToBuffer(result.imageUrl);

  const meta = {
    prompt: result.prompt,
    model: result.model,
    seed: result.seed,
    createdAt: new Date().toISOString(),
    sourceUrl: result.imageUrl,
  };

  let cdnUrl = null;
  try {
    cdnUrl = await uploadToSupabase(buffer, fileName, prompt, meta);
    console.log(`Uploaded to Supabase: ${cdnUrl}`);
  } catch (err) {
    console.warn(`Supabase upload skipped/failed: ${err.message}`);
  }

  const local = await saveLocal(buffer, fileName, meta);
  console.log(`Saved locally: ${local.localPath}`);
  console.log(`Metadata: ${local.metaPath}`);

  console.log(
    JSON.stringify(
      {
        prompt,
        model: result.model,
        cdnUrl,
        localPath: local.localPath,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
