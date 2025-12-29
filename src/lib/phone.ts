export function normalizePhoneDigits(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
  return digits;
}

export function isLikelyValidPhone(input: string): boolean {
  const digits = normalizePhoneDigits(input);
  return digits.length >= 10 && digits.length <= 15;
}

export function formatUsPhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  const normalized = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  const match = normalized.match(/^(\d{0,3})(\d{0,3})(\d{0,4}).*$/);
  if (!match) return input;

  const [, area, prefix, line] = match;

  if (line) return `(${area}) ${prefix}-${line}`;
  if (prefix) return `(${area}) ${prefix}`;
  if (area) return area.length === 3 ? `(${area}) ` : area;
  return '';
}

export function formatPhoneForDisplay(input: string): string {
  const digits = normalizePhoneDigits(input);
  if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  return digits || input;
}

