import fs from 'node:fs';
import path from 'node:path';

const blogPostsPath = path.join(process.cwd(), 'src', 'data', 'blogPosts.ts');

function main() {
  const src = fs.readFileSync(blogPostsPath, 'utf8');

  // Replace any existing imageUrl with a deterministic per-slug file.
  // Assumes each post object contains a `slug: '...'` field.
  const out = src.replace(
    /(\n\s*slug:\s*'([^']+)'[\s\S]*?\n)(\s*)imageUrl:\s*'[^']*',/g,
    (_m, prefix: string, slug: string, indent: string) => {
      return `${prefix}${indent}imageUrl: '/images/generated/blog-${slug}.png',`;
    },
  );

  if (out === src) {
    console.error('No imageUrl fields were updated. (Did the regex fail or are imageUrl fields missing?)');
    process.exit(2);
  }

  fs.writeFileSync(blogPostsPath, out);
  console.log('Updated blog post imageUrl fields to /images/generated/blog-<slug>.png');
}

main();
