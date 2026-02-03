import * as dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { blogPosts, type BlogPost } from '../src/data/blogPosts.ts';
import { generateImage } from './fal-client.ts';

const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else {
  dotenv.config();
}

const OUT_DIR = path.join(process.cwd(), 'public', 'images', 'generated');

function ensureOutDir() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function outPathForSlug(slug: string) {
  return path.join(OUT_DIR, `blog-${slug}.png`);
}

function buildSafetyConstraints() {
  return [
    'no text',
    'no words',
    'no letters',
    'no signage',
    'no logos',
    'no watermarks',
    'no UI',
    'no screens',
    'no phones',
    'no vapes',
    'no e-cigarettes',
    'no vape pens',
    'no USB drives',
    'no inhalers',
    'no smoking devices',
    'no breathalyzer devices',
    'no handheld devices',
    'no syringes',
    'no pills in focus',
    'no faces visible',
    'no identifiable people',
    'no license plates readable',
    'no street names readable',
  ].join(', ');
}

function buildBrandStyle() {
  return [
    'professional legal editorial photography',
    'cinematic lighting',
    'photo-realistic',
    'high detail',
    'clean composition',
    'warm mango-gold accent lighting',
    'deep forest background tones',
    'subtle teal highlights',
    'Delaware County Ohio atmosphere',
  ].join(', ');
}

function buildTopicPrompt(post: BlogPost) {
  const title = post.title.toLowerCase();
  const category = post.category.toLowerCase();

  if (category.includes('ovi') || title.includes('ovi') || title.includes('dui')) {
    if (title.includes('after') && title.includes('arrest')) {
      return 'Ohio traffic citation paperwork, courthouse steps in the background, car keys on a wooden table, law book, night street bokeh police lights far in the distance';
    }
    if (title.includes('lookback')) {
      return 'Ohio law book and a clean abstract timeline graphic made of simple shapes, paperwork stack, calendar page without numbers, professional desk scene';
    }
    if (title.includes('field sobriety')) {
      return 'night roadside scene with blurred police lights in the distance, notebook and pen on dashboard, Ohio traffic law book, calm professional mood';
    }
    if (title.includes('checkpoint')) {
      return 'Ohio highway at night, distant checkpoint lights blurred, road cones out of focus, clean cinematic composition';
    }
    if (title.includes('physical control')) {
      return 'parked car interior at night, keys on center console, court document folder, subtle blue/red bokeh far away, calm scene';
    }
    return 'Ohio traffic law books, courtroom gavel, legal documents on a desk, subtle night street bokeh';
  }

  if (category.includes('drug')) {
    return 'Ohio criminal statutes book open on a desk, evidence folder, laboratory report paperwork, professional legal office scene';
  }

  if (category.includes('sex')) {
    return 'confidential legal consultation room, closed file folder, warm dramatic lighting, privacy-forward professional scene';
  }

  if (category.includes('protection')) {
    return 'civil protection order paperwork on a desk, courthouse hallway background, legal folder and pen, professional legal setting';
  }

  if (category.includes('white collar')) {
    return 'financial documents, ledger, legal file folders, professional corporate office desk scene';
  }

  if (category.includes('personal injury')) {
    return 'accident report paperwork, medical records folder, legal file on desk, warm professional lighting';
  }

  if (category.includes('criminal defense')) {
    return 'courtroom gavel and legal documents, file folders, law book, professional legal office';
  }

  return 'legal documents and law book on a desk, professional legal editorial scene';
}

function buildPrompt(post: BlogPost) {
  return [
    buildTopicPrompt(post),
    buildBrandStyle(),
    buildSafetyConstraints(),
  ].join(', ');
}

function parseArgs() {
  const args = process.argv.slice(2);
  const modeIdx = args.findIndex((a) => a === '--mode');
  const mode = modeIdx !== -1 && args[modeIdx + 1] ? args[modeIdx + 1] : 'missing';

  const force = args.includes('--force');

  const slugsIdx = args.findIndex((a) => a === '--slugs');
  const slugsRaw = slugsIdx !== -1 && args[slugsIdx + 1] ? args[slugsIdx + 1] : '';
  const slugs = slugsRaw
    ? slugsRaw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return { mode, slugs, force };
}

async function main() {
  const { mode, slugs, force } = parseArgs();
  ensureOutDir();

  const selected = blogPosts.filter((p) => {
    if (mode === 'all') return true;
    if (mode === 'slugs') return slugs.includes(p.slug);
    if (mode === 'missing') return !fs.existsSync(outPathForSlug(p.slug));
    return false;
  });

  if (!selected.length) {
    console.log('No images to generate for the given mode.');
    return;
  }

  console.log(`Generating ${selected.length} blog images (mode=${mode})...`);

  for (let i = 0; i < selected.length; i++) {
    const post = selected[i];
    const prompt = buildPrompt(post);
    const outPath = outPathForSlug(post.slug);

    if (!force && fs.existsSync(outPath)) {
      console.log(`\n[${i + 1}/${selected.length}] ${post.slug}`);
      console.log(`Skip (already exists): ${outPath}`);
      continue;
    }

    console.log(`\n[${i + 1}/${selected.length}] ${post.slug}`);
    console.log(`Prompt: ${prompt}`);

    const result = await generateImage({
      prompt,
      width: 1200,
      height: 630,
      model: 'fal-ai/flux-pro',
    });

    fs.writeFileSync(outPath, result.buffer);
    console.log(`Saved: ${outPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
