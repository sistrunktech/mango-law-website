import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SB_URL;
const SUPABASE_SERVICE_ROLE =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE ||
  process.env.SERVICE_ROLE_KEY;
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || process.env.SB_BUCKET || "og-images";
const OG_SIGNED_URL_TTL = Number(process.env.OG_SIGNED_URL_TTL || 60 * 60 * 24 * 365); // default 1 year

export const supaEnabled = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE);

const supa = supaEnabled ? createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE!) : null;

export async function putAndSign({
  path,
  buffer,
  contentType = "image/png",
}: {
  path: string;
  buffer: Buffer;
  contentType?: string;
}) {
  if (!supaEnabled || !supa) {
    throw new Error("Supabase upload not configured (missing SUPABASE_URL/SERVICE_ROLE)");
  }
  const folder = path.split("/").slice(0, -1).join("/");
  const fileName = path.split("/").pop() || path;

  // Check if already exists
  const { data: head, error: headErr } = await supa.storage.from(SUPABASE_BUCKET).list(folder || "", {
    search: fileName,
  });

  const exists = !headErr && head?.some((f) => f.name === fileName);
  if (!exists) {
    const { error } = await supa.storage.from(SUPABASE_BUCKET).upload(path, buffer, {
      contentType,
      upsert: false,
    });
    if (error && !/already exists/i.test(error.message)) {
      throw error;
    }
  }

  const { data: signed, error: signErr } = await supa.storage
    .from(SUPABASE_BUCKET)
    .createSignedUrl(path, OG_SIGNED_URL_TTL);
  if (signErr) throw signErr;

  return { signedUrl: signed?.signedUrl, path };
}
