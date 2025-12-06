import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      new URL('http://res.cloudinary.com/**')
    ],
  },
}

export default nextConfig
