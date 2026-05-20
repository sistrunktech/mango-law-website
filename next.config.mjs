/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV !== 'production';

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      [
        'script-src',
        "'self'",
        "'unsafe-inline'",
        ...(isDevelopment ? ["'unsafe-eval'"] : []),
        'blob:',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://challenges.cloudflare.com',
        'https://api.mapbox.com',
        'https://events.mapbox.com',
      ].join(' '),
      "style-src 'self' 'unsafe-inline' https://api.mapbox.com",
      "img-src 'self' data: blob: https://*.googleusercontent.com https://*.ggpht.com https://www.googletagmanager.com https://www.google-analytics.com https://api.mapbox.com https://events.mapbox.com https://*.tiles.mapbox.com",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.mapbox.com https://events.mapbox.com https://*.tiles.mapbox.com https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://challenges.cloudflare.com",
      "frame-src 'self' https://www.googletagmanager.com https://challenges.cloudflare.com https://www.google.com https://maps.google.com",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
    ].join('; '),
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
];

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  env: {
    NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN:
      process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN ??
      process.env.MAPBOX_PUBLIC_TOKEN ??
      process.env.VITE_MAPBOX_PUBLIC_TOKEN,
    NEXT_PUBLIC_MAPBOX_STYLE_URL:
      process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL ??
      process.env.MAPBOX_STYLE_URL ??
      process.env.VITE_MAPBOX_STYLE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.ggpht.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
