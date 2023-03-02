/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.zara.net',
        port: '',
        pathname: '/photos///**',
      },
    ],
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
