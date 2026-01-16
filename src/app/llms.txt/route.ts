export async function GET() {
  const body = `# LLM Usage Policy for mango.law\n` +
    `# Purpose: Enable discovery and citation while protecting client content.\n\n` +
    `User-agent: *\n` +
    `Allow: discovery\n` +
    `Allow: citation\n` +
    `Allow: summary\n` +
    `Disallow: training\n` +
    `Disallow: fine-tuning\n` +
    `Disallow: dataset-ingestion\n` +
    `Disallow: embedding-reuse\n\n` +
    `Contact: nick@mango.law\n` +
    `Policy-Updated: 2026-01-16\n`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
