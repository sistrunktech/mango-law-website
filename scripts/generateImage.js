#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import process from "process";
import fal from "@fal-ai/client";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// Default preference order (vector-first, then high-quality raster).
const modelsPreference = [
  "fal-ai/star-vector",
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

async function generateImage(prompt, modelOverride) {
  const apiKey = ensureEnv("FAL_API_KEY");
  fal.config({ credentials: apiKey });

  let result;
  const candidates = modelOverride
    ? [modelOverride, ...modelsPreference.filter((m) => m !== modelOverride)]
    : modelsPreference;

  for (const model of candidates) {
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

  const images = result.images || (result.data && result.data.images) || [];

  return {
    imageUrl,
    images,
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
  const contentType = filePath.endsWith(".svg") ? "image/svg+xml" : "image/png";
  const { error } = await supabase.storage.from(bucket).upload(filePath, buffer, {
    cacheControl: "3600",
    contentType,
    upsert: true,
  });
  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  const metaPath = filePath.replace(/\.(png|svg)$/, ".json");
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

async function processPrompt(prompt, count, modelOverride) {
  if (count > 10) {
    console.warn("Count capped at 10 to avoid long queues; adjusting to 10.");
  }
  const total = Math.min(count, 10);

  console.log(`Generating image for prompt: "${prompt}"${modelOverride ? ` (model: ${modelOverride})` : ""}`);
  const result = await generateImage(prompt, modelOverride);
  const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  const fileBase = `${slugify(prompt) || "image"}-${timestamp}`;

  const outputs = [];
  for (let i = 0; i < total; i++) {
    const imageInfo = result.images?.[i] || result.images?.[0] || {};
    const url = imageInfo.url || result.imageUrl;
    if (!url) continue;

    const buffer = await downloadToBuffer(url);
    const isSvg =
      buffer.slice(0, 100).toString("utf8").toLowerCase().includes("<svg") ||
      url.toLowerCase().endsWith(".svg");
    const suffix = total > 1 ? `-${i + 1}` : "";
    const ext = isSvg ? ".svg" : ".png";
    const fileName = `${fileBase}${suffix}${ext}`;

    const meta = {
      prompt: result.prompt || prompt,
      model: result.model,
      seed: imageInfo.seed || result.seed,
      createdAt: new Date().toISOString(),
      sourceUrl: url,
      index: i + 1,
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

    outputs.push({
      prompt,
      model: result.model,
      cdnUrl,
      localPath: local.localPath,
      index: i + 1,
    });
  }

  return outputs;
}

async function main() {
  const args = process.argv.slice(2);
  const batchIdx = args.findIndex((a) => a === "--batch");
  if (batchIdx !== -1 && args[batchIdx + 1]) {
    const batchPath = path.resolve(args[batchIdx + 1]);
    const raw = await fs.readFile(batchPath, "utf8");
    let tasks;
    try {
      tasks = JSON.parse(raw);
    } catch (err) {
      throw new Error(`Failed to parse batch file: ${err.message}`);
    }
    if (!Array.isArray(tasks)) {
      throw new Error("Batch file must be a JSON array of { prompt, count?, model? }");
    }
    const allOutputs = [];
    for (const task of tasks) {
      const prompt = task.prompt;
      const count = Math.max(1, parseInt(task.count || 1, 10) || 1);
      const modelOverride = task.model || null;
      if (!prompt) {
        console.warn("Skipping task without prompt");
        continue;
      }
      const outputs = await processPrompt(prompt, count, modelOverride);
      allOutputs.push(...outputs);
    }
    console.log(JSON.stringify(allOutputs, null, 2));
    return;
  }

  const promptArgIndex = args.findIndex((a) => a === "--prompt");
  const prompt =
    promptArgIndex !== -1 && args[promptArgIndex + 1]
      ? args[promptArgIndex + 1]
      : args.join(" ").trim();

  const countIdx = args.findIndex((a) => a === "--count");
  const count =
    countIdx !== -1 && args[countIdx + 1] ? Math.max(1, parseInt(args[countIdx + 1], 10) || 1) : 1;

  const modelIdx = args.findIndex((a) => a === "--model");
  const modelOverride = modelIdx !== -1 && args[modelIdx + 1] ? args[modelIdx + 1] : null;

  if (!prompt) {
    console.error(
      "Usage: npm run generate:image -- --prompt \"your prompt here\" [--count N] [--model fal-ai/star-vector] [--batch path/to/tasks.json]",
    );
    process.exit(1);
  }

  const outputs = await processPrompt(prompt, count, modelOverride);
  console.log(JSON.stringify(outputs, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
