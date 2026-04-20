/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-pdf'],  // transpile react-pdf but NOT pdfjs-dist
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'genesisbiotech.net',
      },
    ],
  },
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