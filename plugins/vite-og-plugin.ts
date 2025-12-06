import fs from "node:fs";
import path from "node:path";
import { generateImage, falEnabled } from "../scripts/fal-client";
import { putAndSign, supaEnabled } from "../scripts/supa-upload";
import { OG_SPECS } from "../og/og-specs";

const MANIFEST_FILE = "og-manifest.json";

function loadManifest(root: string) {
  const p = path.join(root, ".cache", MANIFEST_FILE);
  if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, "utf-8"));
  return {};
}

function saveManifest(root: string, data: any) {
  const dir = path.join(root, ".cache");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, MANIFEST_FILE), JSON.stringify(data, null, 2));
}

export default function ogPlugin() {
  let root = process.cwd();
  let manifest: Record<string, string> = {};

  return {
    name: "mango-og-pipeline",
    apply: "build",

    async buildStart() {
      if (!falEnabled || !supaEnabled) {
        this.warn("fal.ai or Supabase not configured; skipping OG image generation.");
        return;
      }
      manifest = loadManifest(root);

      for (const spec of OG_SPECS) {
        if (manifest[spec.key]) continue;

        const { buffer } = await generateImage({
          prompt: spec.prompt,
          width: spec.width ?? 1200,
          height: spec.height ?? 630,
        });

        const objectPath = `mango-law/${spec.key}.png`;
        const { signedUrl } = await putAndSign({ path: objectPath, buffer });

        manifest[spec.key] = signedUrl;
        saveManifest(root, manifest);
      }
    },

    transformIndexHtml(html: string) {
      const home = OG_SPECS.find((s) => s.route === "/");
      const img = home ? manifest[home.key] : null;
      if (!img) return html;

      return html.replace(
        "</head>",
        [
          `<meta property="og:image" content="${img}">`,
          `<meta name="twitter:image" content="${img}">`,
          `</head>`,
        ].join("\n"),
      );
    },

    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "og-manifest.json",
        source: JSON.stringify(manifest, null, 2),
      });
    },
  };
}
