import type { Metadata } from 'next';
import fs from 'node:fs/promises';
import path from 'node:path';

import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const seo = {
  title: 'Mango Law — Monthly Update (Feb 2026)',
  description: 'Monthly update report for Mango Law LLC (Dec 2025–Jan 2026 work completed + Feb 2026 plan).',
  url: '/client-updates/2026-02',
  noindex: true,
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Feb 2026', item: seo.url },
];

export const metadata: Metadata = buildMetadata(seo);

async function loadReportMarkdown() {
  const filePath = path.join(process.cwd(), 'docs', 'client-updates', '2026-02.md');
  return await fs.readFile(filePath, 'utf8');
}

function isExternalHref(href?: string) {
  if (!href) return false;
  return href.startsWith('http://') || href.startsWith('https://');
}

export default async function Page() {
  const markdown = await loadReportMarkdown();

  return (
    <section className="container py-12">
      <StructuredData breadcrumbs={breadcrumbs} url={seo.url} />

      <article className="prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children, ...props }) => {
              const external = isExternalHref(href);
              return (
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer nofollow' : undefined}
                  {...props}
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </article>
    </section>
  );
}
