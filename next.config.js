/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/gallery-rudn',
        destination: '/gallery-rudn/signin', // Редирект на страницу авторизации
        permanent: true, // false для временного редиректа (HTTP 302), true для постоянного (HTTP 301)
      },
    ]
  },

  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
 
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,
 
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
 
  // Optional: Change the output directory `out` -> `dist`
  distDir: 'dist',
  images: {
    unoptimized: true,
  }
}
 
module.exports = nextConfig