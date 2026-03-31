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

function buildNegativePrompt() {
  return [
    'photorealism',
    'hyper realistic face',
    '3d render',
    'cgi',
    'claymation',
    'plastic toy look',
    'comic-book style',
    'neon cyberpunk',
    'text overlay',
    'logo',
    'watermark',
    'legible writing',
    'handwriting',
    'paper with writing',
    'labeled folders',
    'book cover text',
    'document text',
    'notebook',
    'clipboard',
    'forms',
    'wall plaque',
    'mail slot',
    'church lettering',
    'facade lettering',
    'printed signs',
    'engraved plaques',
    'ribbon text',
    'breathalyzer device',
    'LED-lit gadget on desk',
    'sensationalized police action',
  ].join(', ');
}

function buildBrandStyle() {
  return [
    'editorial watercolor illustration',
    'ink-and-wash sketch detail',
    'soft gouache texture on warm paper',
    'tasteful legal storytelling art',
    'clean composition with one clear focal subject',
    'restrained mango-gold, forest-green, charcoal, and parchment palette',
    'grounded and human',
    'not abstract and not photorealistic',
    'quiet Ohio legal atmosphere',
  ].join(', ');
}

function buildTopicPrompt(post: BlogPost) {
  const slug = post.slug.toLowerCase();
  const title = post.title.toLowerCase();
  const category = post.category.toLowerCase();

  if (slug.includes('first-ovi-court-date')) {
    return 'Ohio courthouse hallway, an empty wooden bench, doorway light, and a simple closed case folder with no markings';
  }
  if (slug.includes('driving-privileges') || slug.includes('als')) {
    return 'sunlit courthouse window framing an Ohio road at dawn with car keys on the wood sill, no papers, no notebooks, no books, and no visible lettering or building signs';
  }
  if (slug.includes('no-contact-order')) {
    return 'split watercolor scene with a warm stone colonnade on one side and a clean residential doorway on the other, divided by a subtle legal boundary line, with no lamps, no plaques, no wall signs, and no mail slot';
  }
  if (slug.includes('drug-possession-charge')) {
    return 'defense consultation silhouettes beneath courthouse columns with restrained amber light and no shelves, no bottles, and no labeled objects';
  }

  if (category.includes('ovi') || title.includes('ovi') || title.includes('dui')) {
    if (title.includes('after') && title.includes('arrest')) {
      return 'dim Ohio roadside at night leading toward a lit courthouse, with only the edge of a dashboard silhouette in frame and no objects resting on it';
    }
    if (title.includes('lookback')) {
      return 'layered calendar shapes, soft timeline ribbon, and an Ohio courthouse outline with no numbers or labels';
    }
    if (title.includes('field sobriety')) {
      return 'night roadside shoulder, faint patrol lights, measured roadside markers, and a dashboard silhouette';
    }
    if (title.includes('checkpoint')) {
      return 'Ohio roadway with cones, checkpoint shapes, and distant patrol lights in watercolor haze';
    }
    if (title.includes('physical control')) {
      return 'parked car interior at night, keys on the console, and quiet dashboard lighting with no readable displays';
    }
    return 'Ohio roadway, courthouse architectural shapes, car keys, and restrained dusk lighting';
  }

  if (category.includes('drug')) {
    return 'evidence locker silhouette, courthouse architecture, and a measured amber-and-charcoal legal atmosphere';
  }

  if (category.includes('sex')) {
    return 'private consultation room, muted lamp light, closed door, and privacy-forward composition with no documents visible';
  }

  if (category.includes('protection')) {
    return 'courthouse hallway, home doorway, and subtle legal-boundary motif with restrained directional markers';
  }

  if (category.includes('white collar')) {
    return 'corporate boardroom table, abstract financial chart lines without labels, and restrained legal atmosphere';
  }

  if (category.includes('personal injury')) {
    return 'car silhouette, medical cross motif, courthouse outline, and calm recovery-focused composition';
  }

  if (category.includes('criminal defense')) {
    return 'courtroom interior details, courthouse archway, and balanced justice motifs without books or paperwork';
  }

  return 'Ohio courthouse detail, balanced justice motifs, and quiet editorial illustration atmosphere';
}

function buildPrompt(post: BlogPost) {
  const compositions = [
    'wide horizontal composition with breathing room',
    'close editorial crop with balanced negative space',
    'top-down desk composition with one dominant object cluster',
    'angled vignette composition with paper texture visible',
  ] as const;
  const atmosphere = [
    'soft spring daylight with restrained shadows',
    'warm evening interior glow with muted edges',
    'overcast daylight with inked contrast lines',
    'gentle roadside dusk lighting with subdued highlights',
  ] as const;
  const slugHash = [...post.slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return [
    buildTopicPrompt(post),
    buildBrandStyle(),
    compositions[slugHash % compositions.length],
    atmosphere[slugHash % atmosphere.length],
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
      input: {
        negative_prompt: buildNegativePrompt(),
      },
    });

    fs.writeFileSync(outPath, result.buffer);
    console.log(`Saved: ${outPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
