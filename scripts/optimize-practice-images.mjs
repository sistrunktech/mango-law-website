import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const GENERATED_DIR = path.join(ROOT, 'public', 'images', 'generated');

const INPUT_FILES = [
  'criminal-defense-hero.png',
  'ovi-dui-defense-hero.png',
  'drug-crimes-defense-hero.png',
  'sex-crimes-defense-hero.png',
  'white-collar-defense-hero.png',
  'protection-order-defense-hero.png',
  'personal-injury-hero.png',
];

const TARGET_WIDTHS = [480, 960];

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await fs.mkdir(GENERATED_DIR, { recursive: true });

  for (const filename of INPUT_FILES) {
    const inputPath = path.join(GENERATED_DIR, filename);
    const baseName = filename.replace(/\.png$/i, '');

    if (!(await fileExists(inputPath))) {
      throw new Error(`Missing input file: ${path.relative(ROOT, inputPath)}`);
    }

    const image = sharp(inputPath);
    const metadata = await image.metadata();
    if (!metadata.width) {
      throw new Error(`Could not read width for: ${path.relative(ROOT, inputPath)}`);
    }

    for (const width of TARGET_WIDTHS) {
      const resized =
        metadata.width <= width ? image.clone() : image.clone().resize({ width, withoutEnlargement: true });

      const avifPath = path.join(GENERATED_DIR, `${baseName}-${width}w.avif`);
      const webpPath = path.join(GENERATED_DIR, `${baseName}-${width}w.webp`);

      await resized.clone().avif({ quality: 50, effort: 6 }).toFile(avifPath);
      await resized.clone().webp({ quality: 72 }).toFile(webpPath);
    }
  }

  console.log('[done] Generated practice-area AVIF/WebP variants in public/images/generated/');
}

main().catch((err) => {
  console.error('[fatal]', err);
  process.exit(1);
});

