/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'github.com',
      'avatars.githubusercontent.com',
      'github-readme-stats.vercel.app',
      'github-readme-streak-stats.herokuapp.com',
      'github-profile-trophy.vercel.app',
      'github-readme-activity-graph.vercel.app',
      'img.shields.io',
      'komarev.com',
      'readme-typing-svg.herokuapp.com',
      'raw.githubusercontent.com'
    ],
  },
  // Remove env configuration as it's optional and causing issues
  // Environment variables are automatically available in Next.js
}

module.exports = nextConfig 