/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
};

export default nextConfig;
