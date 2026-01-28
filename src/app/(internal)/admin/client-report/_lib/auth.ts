import { createHmac, timingSafeEqual } from 'node:crypto';

function getCookieSecret(): string {
  return process.env.CLIENT_REPORT_COOKIE_SECRET || process.env.CLIENT_REPORT_PASSWORD || '';
}

function getSessionDays(): number {
  const raw = process.env.CLIENT_REPORT_SESSION_DAYS;
  const parsed = raw ? Number(raw) : NaN;
  if (!Number.isFinite(parsed) || parsed <= 0) return 30;
  return parsed;
}

export function getSessionMaxAgeSeconds(): number {
  return getSessionDays() * 24 * 60 * 60;
}

export function createClientReportCookieValue(now: Date = new Date()): string {
  const secret = getCookieSecret();
  const issuedAt = String(now.getTime());
  const sig = createHmac('sha256', secret).update(issuedAt).digest('hex');
  return `${issuedAt}.${sig}`;
}

export function isValidClientReportCookieValue(value: string | undefined, now: Date = new Date()): boolean {
  const secret = getCookieSecret();
  if (!secret) return false;
  if (!value) return false;

  const [issuedAtRaw, sig] = value.split('.');
  if (!issuedAtRaw || !sig) return false;

  const issuedAt = Number(issuedAtRaw);
  if (!Number.isFinite(issuedAt) || issuedAt <= 0) return false;

  const maxAgeMs = getSessionMaxAgeSeconds() * 1000;
  if (now.getTime() - issuedAt > maxAgeMs) return false;

  const expectedSig = createHmac('sha256', secret).update(issuedAtRaw).digest('hex');

  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isValidPassword(input: string): boolean {
  const expected = process.env.CLIENT_REPORT_PASSWORD || '';
  if (!expected) return false;

  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
