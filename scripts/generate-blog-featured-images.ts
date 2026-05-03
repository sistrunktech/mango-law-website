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
    'no Capitol Hill',
    'no Washington DC landmarks',
    'no capitol domes',
    'no monuments',
    'no city skylines',
    'no tree-lined landmark streets',
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
    'Capitol Hill',
    'Washington DC',
    'capitol dome',
    'federal building',
    'monument',
    'city skyline',
    'tree-lined ceremonial street',
    'generic courthouse exterior',
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
    'editorial watercolor legal still-life illustration',
    'traditional ink-and-wash sketch detail',
    'soft gouache texture on warm paper with natural wash edges',
    'tasteful legal storytelling art',
    'neutral tabletop or close editorial crop with one clear focal subject',
    'restrained mango-gold, forest-green, charcoal, and parchment palette',
    'grounded and human',
    'not abstract and not photorealistic',
    'quiet Ohio legal atmosphere without location landmarks',
  ].join(', ');
}

function buildTopicPrompt(post: BlogPost) {
  const slug = post.slug.toLowerCase();
  const title = post.title.toLowerCase();
  const category = post.category.toLowerCase();

  if (slug.includes('first-ovi-court-date')) {
    return 'neutral legal tabletop with a blank case folder, simple calendar page without numbers, pen, and soft doorway light';
  }
  if (slug.includes('driving-privileges') || slug.includes('als')) {
    return 'neutral legal desk with car keys, a blank license-sized card, blank filing papers, and soft dawn window light';
  }
  if (slug.includes('no-contact-order')) {
    return 'neutral tabletop with two separated blank case folders, a subtle boundary line, pen, and soft warm light';
  }
  if (slug.includes('drug-possession-charge')) {
    return 'neutral legal desk with a sealed blank evidence envelope, blank case folder, pen, and restrained amber light';
  }

  if (category.includes('ovi') || title.includes('ovi') || title.includes('dui')) {
    if (title.includes('after') && title.includes('arrest')) {
      return 'neutral legal desk after an OVI arrest with blank citation papers, car keys, a pen, and subdued roadside light through a window';
    }
    if (title.includes('lookback')) {
      return 'top-down legal desk with layered blank calendar pages, timeline ribbon, case folder, and no numbers or labels';
    }
    if (title.includes('field sobriety')) {
      return 'neutral legal tabletop with blank field notes, measured line markers, car keys, and faint roadside color in the background';
    }
    if (title.includes('checkpoint')) {
      return 'watercolor roadside checkpoint concept with cones and distant lights, no readable signs, no police action, and no location landmarks';
    }
    if (title.includes('physical control')) {
      return 'parked car interior at night, keys on the console, and quiet dashboard lighting with no readable displays';
    }
    return 'neutral legal desk with blank case papers, car keys, pen, subtle evidence tab, and restrained dusk lighting';
  }

  if (category.includes('drug')) {
    return 'neutral legal tabletop with a sealed blank evidence envelope, blank case folder, pen, and measured amber-and-charcoal atmosphere';
  }

  if (category.includes('sex')) {
    return 'private consultation room, muted lamp light, closed door, and privacy-forward composition with no documents visible';
  }

  if (category.includes('protection')) {
    return 'neutral tabletop with separated blank folders, soft boundary motif, and restrained directional markers';
  }

  if (category.includes('white collar')) {
    return 'corporate boardroom table, abstract financial chart lines without labels, and restrained legal atmosphere';
  }

  if (category.includes('personal injury')) {
    return 'car silhouette, medical cross motif, courthouse outline, and calm recovery-focused composition';
  }

  if (category.includes('criminal defense')) {
    return 'neutral legal tabletop with two blank case folders, pen, subtle scale of justice, and balanced defense-process cues';
  }

  return 'neutral legal tabletop with blank case folders, pen, subtle scale of justice, and quiet editorial illustration atmosphere';
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
