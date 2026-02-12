import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { blogPosts } from '../src/data/blogPosts.ts';

type DuplicateGroup = {
  key: string;
  slugs: string[];
};

function sha256File(absPath: string) {
  const buf = fs.readFileSync(absPath);
  return createHash('sha256').update(buf).digest('hex');
}

function resolvePublicPathFromUrl(url: string) {
  if (!url.startsWith('/')) return null;
  return path.join(process.cwd(), 'public', url);
}

function main() {
  const missing: string[] = [];
  const byUrl = new Map<string, string[]>();

  for (const post of blogPosts) {
    const url = post.imageUrl;
    if (!url) {
      missing.push(post.slug);
      continue;
    }
    byUrl.set(url, [...(byUrl.get(url) ?? []), post.slug]);
  }

  const duplicateUrls: DuplicateGroup[] = [...byUrl.entries()]
    .filter(([, slugs]) => slugs.length > 1)
    .map(([key, slugs]) => ({ key, slugs }))
    .sort((a, b) => b.slugs.length - a.slugs.length);

  const missingFiles: { imageUrl: string; slugs: string[] }[] = [];
  const byHash = new Map<string, { files: string[]; slugs: string[] }>();

  for (const [imageUrl, slugs] of byUrl.entries()) {
    const abs = resolvePublicPathFromUrl(imageUrl);
    if (!abs || !fs.existsSync(abs)) {
      missingFiles.push({ imageUrl, slugs });
      continue;
    }

    const hash = sha256File(abs);
    const existing = byHash.get(hash);
    if (!existing) {
      byHash.set(hash, { files: [imageUrl], slugs: [...slugs] });
    } else {
      existing.files.push(imageUrl);
      existing.slugs.push(...slugs);
    }
  }

  const duplicateContent = [...byHash.entries()]
    .filter(([, v]) => new Set(v.slugs).size > 1)
    .map(([hash, v]) => ({
      hash,
      files: [...new Set(v.files)],
      slugs: [...new Set(v.slugs)],
    }))
    .sort((a, b) => b.slugs.length - a.slugs.length);

  const generatedDir = path.join(process.cwd(), 'public', 'images', 'generated');
  const generatedPngs = fs
    .readdirSync(generatedDir)
    .filter((f) => f.endsWith('.png'))
    .map((f) => `/images/generated/${f}`);

  const used = new Set([...byUrl.keys()]);
  const unusedGeneratedPngs = generatedPngs.filter((p) => !used.has(p)).sort();

  const report = {
    totals: {
      posts: blogPosts.length,
      missingImageUrlCount: missing.length,
      distinctImageUrls: byUrl.size,
      duplicateUrlCount: duplicateUrls.length,
      missingFilesCount: missingFiles.length,
      duplicateContentCount: duplicateContent.length,
      generatedPngCount: generatedPngs.length,
      unusedGeneratedPngCount: unusedGeneratedPngs.length,
    },
    missingImageUrlSlugs: missing,
    duplicateImageUrls: duplicateUrls,
    missingPublicFiles: missingFiles,
    duplicateImageContent: duplicateContent,
    unusedGeneratedPngs,
  };

  console.log(JSON.stringify(report, null, 2));

  if (missing.length || duplicateUrls.length || missingFiles.length || duplicateContent.length) {
    process.exitCode = 2;
  }
}

main();
