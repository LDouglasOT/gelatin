/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['genesisbiotech.net'],
  },
  transpilePackages: ['react-pdf'],  // transpile react-pdf but NOT pdfjs-dist
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    };

    if (isServer) {
      config.externals = [...(config.externals || []), 'pdfjs-dist'];
    }

    // Tell webpack to treat pdfjs-dist as an external ES module
    // instead of trying to bundle it
    config.module.rules.push({
      test: /node_modules\/pdfjs-dist/,
      type: 'javascript/auto',
    });

    return config;
  },
}

module.exports = nextConfig