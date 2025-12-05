#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const generatedDir = '/tmp/cc-agent/61104689/project/public/generated';

async function downloadSvgs() {
  const files = await fs.readdir(generatedDir);
  const svgFiles = files.filter(f => f.endsWith('.svg'));

  for (const file of svgFiles) {
    const filePath = path.join(generatedDir, file);
    const content = await fs.readFile(filePath, 'utf-8');

    try {
      const json = JSON.parse(content);
      if (json.sourceUrl) {
        console.log(`Downloading ${file} from ${json.sourceUrl}`);
        const response = await fetch(json.sourceUrl);
        const svg = await response.text();
        await fs.writeFile(filePath, svg, 'utf-8');
        console.log(`  ✓ Downloaded ${file}`);
      }
    } catch (e) {
      console.log(`  - ${file} is already SVG content`);
    }
  }
}

downloadSvgs().catch(console.error);
