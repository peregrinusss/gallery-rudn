/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://95.165.168.235:65080/:path*", // Proxy to Backend
  //     },
  //   ];
  // },

  async redirects() {
    return [
      {
        source: "/gallery-rudn",
        destination: "/gallery-rudn/signin", // Редирект на страницу авторизации
        permanent: true, // false для временного редиректа (HTTP 302), true для постоянного (HTTP 301)
      },
    ];
  },

  output: "standalone",

  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  distDir: "dist",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
