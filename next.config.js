/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["rickandmortyapi.com"] },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
