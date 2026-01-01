import * as dotenv from 'dotenv';
import { generateImage } from './fal-client.ts';
import { createClient } from '@supabase/supabase-js';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

dotenv.config();

// Create Supabase client for Node environment
const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL;
// Prefer service role for uploads to avoid RLS issues; fallback to anon if not provided
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Check .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Brand-enhanced prompt template
function enhancePrompt(basePrompt: string): string {
  return `${basePrompt}, warm mango-gold (#F4A460) accent lighting, deep forest (#2C3E50) background tones, subtle teal (#2C7A7B) highlights, professional legal photography, cinematic lighting, photo-realistic, high detail, no faces visible, no identifiable people, clean composition with negative space for text overlay, Delaware County Ohio setting`;
}

interface ImageJob {
  id: string;
  name: string;
  prompt: string;
  width: number;
  height: number;
  bucket: string;
  filename: string;
}

// Define all image generation jobs
const imageJobs: ImageJob[] = [
  // Practice page hero images (7)
  {
    id: 'criminal-defense-hero',
    name: 'Criminal Defense Hero',
    prompt: 'Criminal defense attorney reviewing case files and legal documents, professional office setting, Delaware Ohio, warm lighting, organized workspace',
    width: 1200,
    height: 900,
    bucket: 'mango-law-assets',
    filename: 'criminal-defense-hero.png'
  },
  {
    id: 'ovi-dui-hero',
    name: 'OVI/DUI Defense Hero',
    prompt: 'Professional OVI/DUI defense consultation, legal documents, breathalyzer equipment, courthouse setting',
    width: 1200,
    height: 900,
    bucket: 'mango-law-assets',
    filename: 'ovi-dui-defense-hero.png'
  },
  {
    id: 'drug-crime-hero',
    name: 'Drug Crime Defense Hero',
    prompt: 'Drug crime legal defense strategy, evidence review and lab testing documentation, professional legal setting, organized case files with attention to detail',
    width: 1200,
    height: 900,
    bucket: 'mango-law-assets',
    filename: 'drug-crimes-defense-hero.png'
  },
  {
    id: 'sex-crime-hero',
    name: 'Sex Crime Defense Hero',
    prompt: 'Confidential attorney-client consultation, private office setting, discrete and professional atmosphere, emphasis on privacy and trust',
    width: 1200,
    height: 900,
    bucket: 'mango-law-assets',
    filename: 'sex-crimes-defense-hero.png'
  },
  {
    id: 'white-collar-hero',
    name: 'White Collar Defense Hero',
    prompt: 'White collar crime defense, financial documents and business records review, corporate legal setting, professional office with organized financial files',
    width: 1200,
    height: 900,
    bucket: 'mango-law-assets',
    filename: 'white-collar-defense-hero.png'
  },
  {
    id: 'personal-injury-hero',
    name: 'Personal Injury Hero',
    prompt: 'Personal injury case consultation, attorney reviewing medical records and accident reports, professional legal office, compassionate and strategic approach',
    width: 1200,
    height: 900,
    bucket: 'mango-law-assets',
    filename: 'personal-injury-hero.png'
  },
  {
    id: 'protection-order-hero',
    name: 'Protection Order Defense Hero',
    prompt: 'Protection order legal defense, attorney preparing hearing strategy and gathering evidence, professional office setting, focus on procedural precision and client advocacy',
    width: 1200,
    height: 900,
    bucket: 'mango-law-assets',
    filename: 'protection-order-defense-hero.png'
  },
  // OVI secondary image (1)
  {
    id: 'ovi-strategy',
    name: 'OVI Case Strategy',
    prompt: 'Attorney reviewing OVI case evidence and developing defense strategy, legal documents and testing procedures, professional setting',
    width: 1200,
    height: 900,
    bucket: 'mango-law-assets',
    filename: 'ovi-case-strategy.png'
  },
  // Blog featured images (11)
  {
    id: 'blog-ovi-charges',
    name: 'Blog: Understanding OVI/DUI Charges',
    prompt: 'OVI/DUI legal documents and courtroom gavel, Ohio traffic law books, professional legal photography',
    width: 800,
    height: 600,
    bucket: 'mango-law-assets',
    filename: 'blog-ovi-charges.png'
  },
  {
    id: 'blog-motion-practice',
    name: 'Blog: Motion Practice',
    prompt: 'Legal motion documents being filed at courthouse, scales of justice, professional legal photography',
    width: 800,
    height: 600,
    bucket: 'mango-law-assets',
    filename: 'blog-motion-practice.png'
  },
  {
    id: 'blog-drug-possession',
    name: 'Blog: Drug Possession vs Trafficking',
    prompt: 'Legal documents about drug charges, Ohio criminal statutes, professional legal setting',
    width: 800,
    height: 600,
    bucket: 'mango-law-assets',
    filename: 'blog-drug-possession-trafficking.png'
  },
  {
    id: 'blog-white-collar',
    name: 'Blog: White Collar Crime Defense',
    prompt: 'Financial documents and legal files, corporate law books, professional business setting',
    width: 800,
    height: 600,
    bucket: 'mango-law-assets',
    filename: 'blog-white-collar-defense.png'
  },
  {
    id: 'blog-field-sobriety',
    name: 'Blog: Refusing Field Sobriety Tests',
    prompt: 'Police traffic stop at night, legal rights documentation, Ohio OVI law books',
    width: 800,
    height: 600,
    bucket: 'mango-law-assets',
    filename: 'blog-field-sobriety-refusal.png'
  },
  {
    id: 'blog-lookback-period',
    name: 'Blog: Ohio DUI Lookback Period',
    prompt: 'Timeline of OVI convictions, Ohio legal statutes, BMV records, professional legal documentation',
    width: 800,
    height: 600,
    bucket: 'mango-law-assets',
    filename: 'blog-dui-lookback-period.png'
  },
  {
    id: 'blog-ex-parte',
    name: 'Blog: Ex Parte Protection Orders',
    prompt: 'Civil protection order documents, courthouse setting, legal rights paperwork',
    width: 800,
    height: 600,
    bucket: 'mango-law-assets',
    filename: 'blog-ex-parte-protection-orders.png'
  },
  {
    id: 'blog-weapons-charges',
    name: 'Blog: Ohio Weapons Charges',
    prompt: 'Ohio firearms law books, CCW legal documents, professional legal setting',
    width: 800,
    height: 600,
    bucket: 'mango-law-assets',
    filename: 'blog-ohio-weapons-charges.png'
  },
  {
    id: 'blog-sex-crimes',
    name: 'Blog: Sex Crimes Defense',
    prompt: 'Confidential legal consultation room, Ohio criminal defense documents, privacy-focused setting',
    width: 800,
    height: 600,
    bucket: 'mango-law-assets',
    filename: 'blog-sex-crimes-defense.png'
  },
  {
    id: 'blog-personal-injury',
    name: 'Blog: Personal Injury Claims',
    prompt: 'Personal injury claim documents, medical records, Ohio negligence law books',
    width: 800,
    height: 600,
    bucket: 'mango-law-assets',
    filename: 'blog-personal-injury-claims.png'
  },
  {
    id: 'blog-assault-dv',
    name: 'Blog: Assault and Domestic Violence',
    prompt: 'Ohio assault and domestic violence law books, legal defense documents, professional legal setting',
    width: 800,
    height: 600,
    bucket: 'mango-law-assets',
    filename: 'blog-assault-domestic-violence.png'
  },
  {
    id: 'blog-checkpoint-hotspots',
    name: 'Blog: Ohio DUI Checkpoint Hotspots',
    prompt: 'Ohio highway at night with distant police checkpoint lights, road warning signs, professional legal photography, no faces visible, clean composition with negative space for text overlay',
    width: 800,
    height: 600,
    bucket: 'mango-law-assets',
    filename: 'blog-checkpoint-hotspots.png'
  },
];

interface GeneratedImage {
  id: string;
  name: string;
  localPath: string;
  supabaseUrl: string;
  publicUrl: string;
}

async function uploadToSupabase(
  buffer: Buffer,
  bucket: string,
  filename: string
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filename, buffer, {
      contentType: 'image/png',
      upsert: true
    });

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filename);

  return urlData.publicUrl;
}

async function generateAllImages() {
  console.log(`\n🚀 Starting image generation for ${imageJobs.length} images...\n`);

  const results: GeneratedImage[] = [];
  const tempDir = join(process.cwd(), 'temp-generated');

  // Create temp directory
  try {
    mkdirSync(tempDir, { recursive: true });
  } catch (err) {
    console.log('Temp directory already exists');
  }

  for (let i = 0; i < imageJobs.length; i++) {
    const job = imageJobs[i];
    console.log(`\n📸 [${i + 1}/${imageJobs.length}] Generating: ${job.name}`);
    console.log(`   Prompt: ${job.prompt.substring(0, 80)}...`);

    try {
      // Generate image with fal.ai
      const enhancedPrompt = enhancePrompt(job.prompt);
      console.log(`   🎨 Using enhanced prompt...`);

      const result = await generateImage({
        prompt: enhancedPrompt,
        width: job.width,
        height: job.height,
        model: 'fal-ai/flux-pro' // Fast, high quality
      });

      console.log(`   ✅ Image generated (${result.buffer.length} bytes)`);

      // Save locally for review
      const localPath = join(tempDir, job.filename);
      writeFileSync(localPath, result.buffer);
      console.log(`   💾 Saved locally: ${localPath}`);

      // Upload to Supabase
      console.log(`   ☁️  Uploading to Supabase...`);
      const publicUrl = await uploadToSupabase(
        result.buffer,
        job.bucket,
        job.filename
      );
      console.log(`   ✅ Uploaded: ${publicUrl}`);

      results.push({
        id: job.id,
        name: job.name,
        localPath,
        supabaseUrl: `${job.bucket}/${job.filename}`,
        publicUrl
      });

      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`   ❌ Failed to generate ${job.name}:`, error);
      console.log(`   ⏭️  Continuing with next image...`);
    }
  }

  // Save manifest
  const manifest = {
    generated: new Date().toISOString(),
    count: results.length,
    images: results
  };

  const manifestPath = join(tempDir, 'image-manifest.json');
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n📋 Manifest saved: ${manifestPath}`);

  // Print summary
  console.log(`\n\n✨ Generation Complete! ✨`);
  console.log(`\nSuccessfully generated: ${results.length}/${imageJobs.length} images`);
  console.log(`\nImages saved in: ${tempDir}`);
  console.log(`\nNext steps:`);
  console.log(`1. Review images in ${tempDir}`);
  console.log(`2. Check image-manifest.json for URLs`);
  console.log(`3. Update components to use the new image URLs`);

  return results;
}

// Run immediately
generateAllImages()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });

export { generateAllImages, imageJobs };
