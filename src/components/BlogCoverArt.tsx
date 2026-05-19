import Image from 'next/image';
import type { BlogPost, BlogScope } from '@/data/blogPosts';
import { resolveBlogScope } from '@/data/blogPosts';
import { getBlogPostFeaturedImageAlt, getBlogPostFeaturedImageUrl } from '@/lib/blogImages';

type Variant = 'card' | 'hero';

type CoverStyle = {
  badge: string;
  tint: string;
  frame: string;
  kicker: string;
};

const COVER_STYLES: Record<BlogScope, CoverStyle> = {
  ovi_dui: {
    badge: 'bg-brand-mango text-brand-black',
    tint: 'from-brand-black/25 via-transparent to-brand-leaf/35',
    frame: 'border-brand-mango/20',
    kicker: 'OVI defense guide',
  },
  criminal_defense: {
    badge: 'bg-brand-leaf text-white',
    tint: 'from-brand-black/30 via-transparent to-[#35524A]/35',
    frame: 'border-brand-leaf/18',
    kicker: 'Criminal defense guide',
  },
  drug_crimes: {
    badge: 'bg-brand-gold text-brand-black',
    tint: 'from-brand-black/30 via-transparent to-[#7A6541]/35',
    frame: 'border-brand-gold/18',
    kicker: 'Drug case guide',
  },
  sex_crimes: {
    badge: 'bg-brand-mango text-brand-black',
    tint: 'from-brand-black/32 via-transparent to-[#5C3845]/35',
    frame: 'border-brand-mango/18',
    kicker: 'Sensitive-charge guide',
  },
  protection_orders: {
    badge: 'bg-white/90 text-brand-black',
    tint: 'from-brand-black/30 via-transparent to-[#355B78]/35',
    frame: 'border-white/15',
    kicker: 'Protection-order guide',
  },
  white_collar: {
    badge: 'bg-brand-gold text-brand-black',
    tint: 'from-brand-black/32 via-transparent to-[#66563B]/38',
    frame: 'border-brand-gold/18',
    kicker: 'White-collar guide',
  },
  personal_injury: {
    badge: 'bg-brand-leaf text-white',
    tint: 'from-brand-black/28 via-transparent to-[#41615D]/35',
    frame: 'border-brand-leaf/18',
    kicker: 'Ohio legal guide',
  },
  domestic_violence: {
    badge: 'bg-brand-mango text-brand-black',
    tint: 'from-brand-black/32 via-transparent to-[#6D3A3A]/40',
    frame: 'border-brand-mango/18',
    kicker: 'Domestic violence guide',
  },
  general: {
    badge: 'bg-brand-leaf text-white',
    tint: 'from-brand-black/28 via-transparent to-brand-forest/35',
    frame: 'border-brand-leaf/18',
    kicker: 'Ohio legal guide',
  },
};

function joinClasses(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export default function BlogCoverArt({
  post,
  variant = 'card',
  className = '',
  contentMode = 'full',
}: {
  post: BlogPost;
  variant?: Variant;
  className?: string;
  contentMode?: 'full' | 'minimal';
}) {
  const scope = resolveBlogScope(post);
  const style = COVER_STYLES[scope];
  const isHero = variant === 'hero';
  const imageUrl = getBlogPostFeaturedImageUrl(post);

  return (
    <div
      className={joinClasses(
        'group relative overflow-hidden border bg-brand-black text-white shadow-soft',
        style.frame,
        isHero
          ? 'h-[240px] rounded-[1.75rem] sm:h-[280px] lg:h-auto lg:aspect-[21/9] lg:min-h-[280px]'
          : 'aspect-[16/10] rounded-2xl',
        className,
      )}
    >
      <Image
        src={imageUrl}
        alt={getBlogPostFeaturedImageAlt(post)}
        fill
        sizes={isHero ? '(min-width: 1024px) 1120px, 100vw' : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        priority={isHero}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.18),transparent_42%)]" />
      <div className={joinClasses('absolute inset-0 bg-gradient-to-br', style.tint)} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,11,0.08)_0%,rgba(7,12,11,0.1)_45%,rgba(7,12,11,0.34)_100%)]" />
      <div className="absolute inset-[14px] rounded-[1.15rem] border border-white/14" />

      <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={joinClasses(
                'inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] shadow-sm',
                style.badge,
              )}
            >
              {post.category}
            </span>
            {isHero && (
              <span className="hidden rounded-full border border-white/16 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 md:inline-flex">
                {style.kicker}
              </span>
            )}
          </div>
        </div>

        {contentMode === 'full' ? (
          <div className="max-w-[80%]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
              {isHero ? 'Practical next steps' : style.kicker}
            </p>
            <p
              className={joinClasses(
                'mt-2 text-sm leading-relaxed text-white/90',
                isHero ? 'max-w-xl text-base md:text-lg' : 'line-clamp-2 max-w-[24ch]',
              )}
            >
              {post.excerpt}
            </p>
          </div>
        ) : (
          <div className="max-w-[75%]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/68">
              {style.kicker}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
