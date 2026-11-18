import type { NextConfig } from 'next'
const config: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  // Assets are compressed WebP files served directly by both Next.js and Sites.
  images: { unoptimized: true },
}
export default config
