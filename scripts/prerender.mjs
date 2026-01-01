import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import puppeteer from 'puppeteer';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');
const EXCLUDE_PREFIXES = ['/admin', '/docs', '/handoff'];

function getContentType(filePath) {
  const ext = path.extname(filePath);
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'application/javascript; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.webp':
      return 'image/webp';
    case '.avif':
      return 'image/avif';
    default:
      return 'application/octet-stream';
  }
}

async function loadRoutes() {
  const xml = await readFile(SITEMAP_PATH, 'utf8');
  const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
  const routes = locs.map((loc) => new URL(loc).pathname);
  return routes.filter(
    (route) => !EXCLUDE_PREFIXES.some((prefix) => route === prefix || route.startsWith(`${prefix}/`))
  );
}

function createStaticServer() {
  return http.createServer(async (req, res) => {
    if (!req.url) {
      res.writeHead(400);
      res.end('Bad request');
      return;
    }

    const requestPath = decodeURIComponent(req.url.split('?')[0]);
    const safePath = path
      .normalize(requestPath)
      .replace(/^(\.\.(\/|\\|$))+/, '')
      .replace(/^\/+/, '');
    let filePath = path.join(DIST_DIR, safePath);

    if (!filePath.startsWith(DIST_DIR)) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    try {
      const stats = await stat(filePath);
      if (stats.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
    } catch {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    try {
      const data = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': getContentType(filePath) });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });
}

async function prerenderRoutes(routes) {
  const server = createStaticServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 4173;
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    for (const route of routes) {
      const url = `${baseUrl}${route}`;
      await page.goto(url, { waitUntil: 'networkidle0' });
      await new Promise((resolve) => setTimeout(resolve, 250));

      const html = await page.content();
      const outputPath = route === '/' ? path.join(DIST_DIR, 'index.html') : path.join(DIST_DIR, route, 'index.html');
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, html, 'utf8');
      console.log(`Prerendered ${route}`);
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

async function main() {
  try {
    const routes = await loadRoutes();
    if (routes.length === 0) {
      console.warn('No routes found to prerender.');
      return;
    }
    await prerenderRoutes(routes);
  } catch (error) {
    console.error('Prerender failed:', error);
    process.exitCode = 1;
  }
}

main();
