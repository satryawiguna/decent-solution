/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@workspace-pro/shared"],
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
