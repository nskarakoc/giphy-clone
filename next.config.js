/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.giphy.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
