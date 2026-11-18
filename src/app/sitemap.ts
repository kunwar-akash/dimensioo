import type { MetadataRoute } from 'next'
import { brand, navigation, projects, services } from '../content'

export default function sitemap(): MetadataRoute.Sitemap {
  if (!brand.url) return []
  return [
    ...navigation.map(([, path]) => path),
    ...services.map(item => `/services/${item.slug}`),
    ...projects.map(item => `/work/${item.slug}`),
    '/privacy-policy', '/terms',
  ].map(path => ({ url: new URL(path, brand.url).href }))
}
