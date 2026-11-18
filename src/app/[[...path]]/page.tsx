import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { connection } from 'next/server'
import { brand, projects, services } from '../../content'
import { About, Home, Influencers, LeadPage, LegalPage, ProjectDetail, ServiceDetail, Services, Work } from '../../components/pages'
import { inquiryAvailable } from '../../inquiry-config'

const pages = {
  '': ['Dimensioo — Think Bigger. Market Smarter.', brand.description],
  about: ['About Us', 'Meet Dimensioo, a strategy-led creative marketing agency working across brand, social, creators and growth.'],
  services: ['Marketing Services', 'Explore Dimensioo services across social, influencers, performance, creative, branding and digital experiences.'],
  work: ['Our Work', 'Explore Dimensioo’s conceptual campaigns and creative portfolio.'],
  influencers: ['Influencer Network', 'Discover how Dimensioo plans creator partnerships, influencer campaigns and content amplification.'],
  creators: ['For Creators', 'Introduce your work to Dimensioo and explore creator collaboration and representation.'],
  contact: ['Contact', 'Talk to Dimensioo about creative marketing, creator partnerships or your next campaign.'],
  'privacy-policy': ['Privacy Policy', 'How Dimensioo handles information shared through its website.'],
  terms: ['Terms and Conditions', 'Terms for using the Dimensioo website.'],
} satisfies Record<string, string[]>

type RouteProps = { params: Promise<{ path?: string[] }> }

export function generateStaticParams() {
  return [
    ...Object.keys(pages).map(value => ({ path: value ? [value] : [] })),
    ...services.map(item => ({ path: ['services', item.slug] })),
    ...projects.map(item => ({ path: ['work', item.slug] })),
  ]
}

async function resolve(params: RouteProps['params']) {
  const { path = [] } = await params
  const route = path.join('/')
  const service = path.length === 2 && path[0] === 'services' ? services.find(item => item.slug === path[1]) : undefined
  const project = path.length === 2 && path[0] === 'work' ? projects.find(item => item.slug === path[1]) : undefined
  return { route, service, project }
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { route, service, project } = await resolve(params)
  const page = Object.hasOwn(pages, route) ? pages[route as keyof typeof pages] : undefined
  const title = service?.name || project?.name || page?.[0]
  const description = service?.pitch || project?.challenge || page?.[1]
  if (!title || !description) return { title: 'Page not found', robots: { index: false } }
  const url = brand.url ? new URL('/' + route, brand.url).href : undefined
  const image = brand.url ? new URL(project ? project.cover : '/assets/hero.webp', brand.url).href : undefined
  return {
    title: route ? title : { absolute: title }, description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: { title, description, type: 'website', url, siteName: brand.name, images: image ? [{ url: image }] : undefined },
    twitter: { card: 'summary_large_image', title, description, images: image ? [image] : undefined },
  }
}

function StructuredData({ service }: { service?: typeof services[number] }) {
  const organization = { '@type': 'Organization', name: brand.name, ...(brand.url && { url: brand.url }), ...(brand.instagram && { sameAs: [brand.instagram] }) }
  const data = service ? { '@type': 'Service', name: service.name, description: service.pitch, provider: organization } : organization
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c') }} />
}

export default async function Page({ params }: RouteProps) {
  const { route, service, project } = await resolve(params)
  if (service) return <><StructuredData service={service} /><ServiceDetail service={service} /></>
  if (project) return <ProjectDetail project={project} />
  switch (route) {
    case '': return <><StructuredData /><Home /></>
    case 'about': return <About />
    case 'services': return <Services />
    case 'work': return <Work />
    case 'influencers': return <Influencers />
    case 'creators':
    case 'contact':
      await connection()
      return <LeadPage creator={route === 'creators'} available={inquiryAvailable()} />
    case 'privacy-policy': return <LegalPage privacy />
    case 'terms': return <LegalPage privacy={false} />
    default: notFound()
  }
}
