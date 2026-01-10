export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://mango.law';
export const TITLE_SUFFIX = 'Mango Law';
const TITLE_SUFFIX_REGEX = /\|\s*Mango Law( LLC)?/i;

export const defaultSEO = {
  primaryKeyword: 'Criminal Defense',
  secondaryModifier: 'OVI Attorney in Ohio',
  title: 'Criminal Defense - OVI Attorney in Ohio | Mango Law',
  description:
    'Aggressive and experienced criminal defense attorney serving Delaware and Franklin Counties. 26+ years defending OVI, drug crimes, assault, sex crimes, and white collar cases.',
  image: '/images/brand/mango-logo-primary-fullcolor.svg',
  type: 'website' as const,
};

export type SeoInput = {
  title?: string;
  primaryKeyword?: string;
  secondaryModifier?: string;
  description?: string;
  image?: string;
  url?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  pathname?: string;
};

function resolveAbsoluteUrl(url?: string, pathname?: string) {
  if (url) {
    if (url.startsWith('http')) return url;
    return `${SITE_URL}${url}`;
  }
  if (pathname) return `${SITE_URL}${pathname}`;
  return SITE_URL;
}

export function formatTitle({
  title,
  primaryKeyword,
  secondaryModifier,
}: {
  title?: string;
  primaryKeyword?: string;
  secondaryModifier?: string;
}) {
  const basePrimary = (primaryKeyword || defaultSEO.primaryKeyword).trim();
  const baseSecondary = (secondaryModifier || defaultSEO.secondaryModifier).trim();
  let resolvedTitle = (title || '').trim();

  if (!resolvedTitle) {
    resolvedTitle = `${basePrimary} - ${baseSecondary}`;
  }

  if (TITLE_SUFFIX_REGEX.test(resolvedTitle)) {
    return resolvedTitle.replace(TITLE_SUFFIX_REGEX, `| ${TITLE_SUFFIX}`);
  }

  return `${resolvedTitle} | ${TITLE_SUFFIX}`;
}

export function resolveSeo(input: SeoInput) {
  const fullTitle = formatTitle({
    title: input.title,
    primaryKeyword: input.primaryKeyword,
    secondaryModifier: input.secondaryModifier,
  });
  const fullDescription = input.description ?? defaultSEO.description;
  const fullImage = input.image
    ? input.image.startsWith('http')
      ? input.image
      : `${SITE_URL}${input.image}`
    : `${SITE_URL}${defaultSEO.image}`;
  const fullUrl = resolveAbsoluteUrl(input.canonicalUrl || input.url, input.pathname);
  const type = input.type ?? defaultSEO.type;

  return {
    fullTitle,
    fullDescription,
    fullImage,
    fullUrl,
    type,
  };
}
