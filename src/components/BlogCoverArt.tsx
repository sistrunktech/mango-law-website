import type { BlogPost, BlogScope } from '@/data/blogPosts';
import { resolveBlogScope } from '@/data/blogPosts';

type Variant = 'card' | 'hero';

type CoverStyle = {
  gradient: string;
  glow: string;
  badge: string;
  outline: string;
  kicker: string;
};

const COVER_STYLES: Record<BlogScope, CoverStyle> = {
  ovi_dui: {
    gradient: 'from-brand-black via-[#14281D] to-brand-leaf',
    glow: 'bg-brand-mango/20',
    badge: 'bg-brand-mango text-brand-black',
    outline: 'border-brand-mango/25',
    kicker: 'OVI defense guide',
  },
  criminal_defense: {
    gradient: 'from-brand-black via-[#172226] to-[#35524A]',
    glow: 'bg-brand-leaf/20',
    badge: 'bg-brand-leaf text-white',
    outline: 'border-brand-leaf/25',
    kicker: 'Criminal defense guide',
  },
  drug_crimes: {
    gradient: 'from-brand-black via-[#1B2A28] to-[#5F7C68]',
    glow: 'bg-brand-gold/18',
    badge: 'bg-brand-gold text-brand-black',
    outline: 'border-brand-gold/25',
    kicker: 'Drug case guide',
  },
  sex_crimes: {
    gradient: 'from-brand-black via-[#261E22] to-[#5C3845]',
    glow: 'bg-brand-mango/18',
    badge: 'bg-brand-mango text-brand-black',
    outline: 'border-brand-mango/25',
    kicker: 'Sensitive-charge guide',
  },
  protection_orders: {
    gradient: 'from-brand-black via-[#1C2532] to-[#355B78]',
    glow: 'bg-brand-leaf/18',
    badge: 'bg-white/15 text-white',
    outline: 'border-white/15',
    kicker: 'Protection-order guide',
  },
  white_collar: {
    gradient: 'from-brand-black via-[#24201B] to-[#66563B]',
    glow: 'bg-brand-gold/22',
    badge: 'bg-brand-gold text-brand-black',
    outline: 'border-brand-gold/25',
    kicker: 'White-collar guide',
  },
  personal_injury: {
    gradient: 'from-brand-black via-[#1A2424] to-[#41615D]',
    glow: 'bg-brand-leaf/18',
    badge: 'bg-brand-leaf text-white',
    outline: 'border-brand-leaf/25',
    kicker: 'Ohio legal guide',
  },
  domestic_violence: {
    gradient: 'from-brand-black via-[#2A1D1D] to-[#6D3A3A]',
    glow: 'bg-brand-mango/22',
    badge: 'bg-brand-mango text-brand-black',
    outline: 'border-brand-mango/25',
    kicker: 'Domestic violence guide',
  },
  general: {
    gradient: 'from-brand-black via-[#1B2520] to-brand-forest',
    glow: 'bg-brand-leaf/18',
    badge: 'bg-brand-leaf text-white',
    outline: 'border-brand-leaf/25',
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

  return (
    <div
      className={joinClasses(
        'relative overflow-hidden border bg-brand-black text-white',
        style.outline,
        isHero ? 'aspect-[21/9] min-h-[280px] rounded-[1.75rem]' : 'aspect-[16/10] rounded-2xl',
        className,
      )}
    >
      <div className={joinClasses('absolute inset-0 bg-gradient-to-br', style.gradient)} />
      <div className="absolute inset-0 opacity-[0.14]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(120deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0) 35%), repeating-linear-gradient(-45deg, transparent, transparent 18px, rgba(255,255,255,0.05) 18px, rgba(255,255,255,0.05) 19px)',
          }}
        />
      </div>
      <div className={joinClasses('absolute -right-16 top-0 h-48 w-48 rounded-full blur-3xl', style.glow)} />
      <div className="absolute inset-x-6 bottom-6 top-6 rounded-[1.25rem] border border-white/10" />

      <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className={joinClasses('rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]', style.badge)}>
            {post.category}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
            Mango Law
          </span>
        </div>

        {contentMode === 'minimal' ? (
          <div className="max-w-lg">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              {style.kicker}
            </p>
            <p className={joinClasses('font-display font-bold tracking-tight text-white', isHero ? 'text-3xl md:text-5xl' : 'text-2xl')}>
              Mango Law
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/72 md:text-base">
              Ohio defense guidance built around the questions clients ask first.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              {style.kicker}
            </p>
            <h2
              className={joinClasses(
                'font-display font-bold tracking-tight text-white',
                isHero ? 'max-w-3xl text-3xl md:text-5xl' : 'text-2xl md:text-[1.95rem]',
              )}
            >
              {post.title}
            </h2>
            <p className={joinClasses('mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base', isHero ? '' : 'line-clamp-3')}>
              {post.excerpt}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
