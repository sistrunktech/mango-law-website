import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../data/blogPosts';

interface RelatedPostsProps {
  posts: BlogPost[];
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="my-12">
      <h3 className="mb-6 text-2xl font-bold text-brand-black">Related Articles</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-xl border border-brand-black/10 bg-white transition-all hover:border-brand-mango hover:shadow-lg"
          >
            {post.imageUrl && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  width={800}
                  height={450}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
            <div className="p-5">
              <div className="mb-2 inline-block rounded-full bg-brand-mango/10 px-3 py-1 text-xs font-semibold text-brand-mango">
                {post.category}
              </div>
              <h4 className="mb-2 text-lg font-bold leading-tight text-brand-black group-hover:text-brand-mango">
                {post.title}
              </h4>
              <p className="mb-3 line-clamp-2 text-sm text-brand-black/60">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-brand-black/50">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {estimateReadingTime(post.content)} min read
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
