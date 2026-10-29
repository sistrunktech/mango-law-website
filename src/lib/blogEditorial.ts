export const EDITORIAL_AUTHOR = 'Mango Law Editorial Team';

export function isEditorialAuthor(author: string) {
  return author === EDITORIAL_AUTHOR;
}

export function getBlogOfferNotice(offerEndsAt?: string, now = new Date()) {
  if (!offerEndsAt) return null;
  return now.getTime() >= Date.parse(offerEndsAt)
    ? 'Expired offer: the announced Halloween 2026 ride-credit window has ended. This article is retained for reference. Check the official program for future offers.'
    : 'Time-limited 2026 offer: OTSO announced October 29 at 5 p.m. through November 2 at 3 a.m. Credits are not guaranteed. Check the official program for current availability and terms.';
}
