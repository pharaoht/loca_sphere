import type { NextConfig } from 'next'
import type { Configuration } from 'webpack'

const nextConfig: NextConfig = {
  webpack(config: Configuration, { dev, isServer }) {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },


  images: {
    remotePatterns: [
      new URL('http://res.cloudinary.com/**')
    ],
  },
}

export default nextConfig
