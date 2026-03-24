/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
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