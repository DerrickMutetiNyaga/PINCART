import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/dashboard/'],
    },
    sitemap: 'https://pinkcart.vercel.app/sitemap.xml',
  }
}
