/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // ✅ Fix Tailwind fs errors for CLIENT bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        module: false,
        perf_hooks: false,
        v8: false
      };
    }
    return config;
  },
  transpilePackages: ['firebase']
};

module.exports = nextConfig;