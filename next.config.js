/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  // output: "export",

  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://95.165.168.235:65080/:path*' // Proxy destination
  //     },
  //   ]
  // },

  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
