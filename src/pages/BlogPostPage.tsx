import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import CTASection from '../components/CTASection';

function parseMarkdownText(text: string): JSX.Element[] {
  const parts: JSX.Element[] = [];
  let currentIndex = 0;
  let key = 0;

  const boldRegex = /\*\*(.+?)\*\*/g;
  const italicRegex = /\*(.+?)\*/g;
  const linkRegex = /\[(.+?)\]\((.+?)\)/g;
  const codeRegex = /`(.+?)`/g;

  const patterns = [
    { regex: boldRegex, type: 'bold' as const },
    { regex: linkRegex, type: 'link' as const },
    { regex: codeRegex, type: 'code' as const },
    { regex: italicRegex, type: 'italic' as const },
  ];

  const matches: Array<{ index: number; length: number; type: string; match: RegExpExecArray }> = [];

  patterns.forEach(({ regex, type }) => {
    let match;
    const r = new RegExp(regex);
    while ((match = r.exec(text)) !== null) {
      matches.push({ index: match.index, length: match[0].length, type, match });
    }
  });

  matches.sort((a, b) => a.index - b.index);

  matches.forEach((m) => {
    if (m.index > currentIndex) {
      parts.push(<span key={key++}>{text.slice(currentIndex, m.index)}</span>);
    }

    if (m.type === 'bold') {
      parts.push(<strong key={key++} className="font-semibold text-brand-black">{m.match[1]}</strong>);
    } else if (m.type === 'link') {
      parts.push(
        <a
          key={key++}
          href={m.match[2]}
          className="text-brand-mango underline hover:text-brand-leaf"
          target="_blank"
          rel="noopener noreferrer"
        >
          {m.match[1]}
        </a>
      );
    } else if (m.type === 'code') {
      parts.push(
        <code key={key++} className="rounded bg-brand-black/5 px-1.5 py-0.5 font-mono text-sm">
          {m.match[1]}
        </code>
      );
    } else if (m.type === 'italic') {
      parts.push(<em key={key++}>{m.match[1]}</em>);
    }

    currentIndex = m.index + m.length;
  });

  if (currentIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(currentIndex)}</span>);
  }

  return parts;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-black">Post Not Found</h1>
          <p className="mt-4 text-brand-black/60">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn btn-primary mt-8 inline-block">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-white py-12">
        <div className="container max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-mango transition-colors hover:text-brand-leaf"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>

          <div className="mt-8">
            <div className="inline-block rounded-full bg-brand-mango/10 px-4 py-1.5 text-sm font-semibold text-brand-mango">
              {post.category}
            </div>

            <h1 className="mt-6 text-4xl font-bold text-brand-black md:text-5xl">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-6 text-sm text-brand-black/60">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
            </div>
          </div>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="mt-8 w-full rounded-2xl object-cover shadow-lg"
              style={{ maxHeight: '500px' }}
            />
          )}

          <div className="prose prose-lg mt-12 max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="mt-8 text-2xl font-bold text-brand-black">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="mt-6 text-xl font-bold text-brand-black">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter((line) => line.startsWith('- '));
                return (
                  <ul key={index} className="my-4 space-y-2">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-mango" />
                        <span className="text-brand-black/80">{item.replace('- ', '')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="leading-relaxed text-brand-black/80">
                  {parseMarkdownText(paragraph)}
                </p>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Need legal guidance?"
        body="If you're facing criminal charges, contact Mango Law for experienced representation in Delaware and Franklin County."
        primaryLabel="Free Consultation"
        primaryHref="/contact"
        secondaryLabel="(740) 602-2155"
        secondaryHref="tel:7406022155"
      />
    </>
  );
}
