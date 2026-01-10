import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

dotenv.config();

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createBucketAndUpload() {
  const bucketName = 'mango-law-assets';
  const tempDir = join(process.cwd(), 'temp-generated');

  console.log('\n📦 Creating Supabase storage bucket...');

  // Create bucket
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();

  const bucketExists = buckets?.some(b => b.name === bucketName);

  if (!bucketExists) {
    const { error: createError } = await supabase.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: 5242880 // 5MB
    });

    if (createError) {
      console.error('❌ Failed to create bucket:', createError);
      throw createError;
    }
    console.log('✅ Bucket created successfully');
  } else {
    console.log('✅ Bucket already exists');
  }

  // Upload all PNG files
  console.log('\n📤 Uploading images...\n');
  const files = readdirSync(tempDir).filter(f => f.endsWith('.png'));

  const results = [];
  for (const file of files) {
    const filePath = join(tempDir, file);
    const fileBuffer = readFileSync(filePath);

    console.log(`   Uploading ${file}...`);

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(file, fileBuffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (error) {
      console.error(`   ❌ Failed: ${error.message}`);
      continue;
    }

    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(file);

    console.log(`   ✅ Uploaded: ${urlData.publicUrl}`);

    results.push({
      filename: file,
      publicUrl: urlData.publicUrl
    });
  }

  console.log(`\n✨ Upload complete! ${results.length}/${files.length} images uploaded\n`);

  // Print manifest
  console.log('📋 Image URLs:\n');
  results.forEach(r => {
    console.log(`${r.filename}`);
    console.log(`  ${r.publicUrl}\n`);
  });

  return results;
}

createBucketAndUpload()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
