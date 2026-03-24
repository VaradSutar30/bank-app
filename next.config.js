/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: false,  // ✅ Disable - causes fs errors
  },
  transpilePackages: ['firebase'],  // ✅ Fix Firebase bundling
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,  // ✅ Fix Tailwind fs errors
      path: false,
      module: false
    };
    return config;
  }
};

module.exports = nextConfig;