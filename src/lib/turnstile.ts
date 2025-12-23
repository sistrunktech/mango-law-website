export const TURNSTILE_SITE_KEY: string | undefined = (() => {
  const configured = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  if (configured !== undefined) {
    const trimmed = configured.trim();
    return trimmed.length ? trimmed : undefined;
  }

  // Public fallback for mango.law (avoids build-env drift).
  return '0x4AAAAAACIPDfIc7zfQ5iO6';
})();

