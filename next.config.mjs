/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Enforce canonical host and scheme.
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'host', value: 'www.mango.law' }],
        destination: 'https://mango.law/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://mango.law/:path*',
        permanent: true,
      },

      // Legacy route consolidation to reduce recurring 404 crawl waste.
      { source: '/dui-checkpoints', destination: '/resources/dui-checkpoints', permanent: true },
      { source: '/dui-checkpoint', destination: '/resources/dui-checkpoints', permanent: true },
      { source: '/checkpoints', destination: '/resources/dui-checkpoints', permanent: true },
      { source: '/resources/dui-checkpoint', destination: '/resources/dui-checkpoints', permanent: true },
      { source: '/criminal-defense', destination: '/criminal-defense-delaware-oh', permanent: true },
      { source: '/ovi-dui-defense', destination: '/ovi-dui-defense-delaware-oh', permanent: true },
      { source: '/drug-crimes', destination: '/drug-crime-lawyer-delaware-oh', permanent: true },
      { source: '/sex-crimes', destination: '/sex-crime-defense-lawyer-delaware-oh', permanent: true },
      { source: '/white-collar-crimes', destination: '/white-collar-crimes-attorney-delaware-oh', permanent: true },
      { source: '/protection-orders', destination: '/protection-order-lawyer-delaware-oh', permanent: true },
      { source: '/domestic-violence', destination: '/domestic-violence-lawyer-delaware-oh', permanent: true },
      { source: '/personal-injury', destination: '/personal-injury-lawyer-delaware-oh', permanent: true },
      { source: '/practice-area', destination: '/practice-areas', permanent: true },
      { source: '/service-areas', destination: '/locations', permanent: true },
      { source: '/blog/ohio-dui-look-back-period', destination: '/blog/ohio-dui-lookback-period', permanent: true },
      { source: '/blog/understanding-ovi-dui-charges', destination: '/blog/understanding-ovi-dui-charges-ohio', permanent: true },
    ];
  },
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
