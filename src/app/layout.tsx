import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { brand, navigation, services } from '../content'
import { Navigation } from '../components/navigation'
import { Reveal } from '../components/reveal'
import './styles.css'
import './motion.css'

export const metadata: Metadata = {
  title: { default: 'Dimensioo — Think Bigger. Market Smarter.', template: '%s | Dimensioo' },
  description: brand.description,
  metadataBase: brand.url ? new URL(brand.url) : undefined,
  icons: { icon: '/icon.svg' },
}

function Wordmark() {
  return <span className="wordmark">Dimensi<span>oo</span></span>
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <a className="skip" href="#content">Skip to content</a>
    <header className="header"><div className="scroll-progress" aria-hidden="true" /><div className="nav-wrap">
      <Link href="/" className="brand-link" aria-label="Dimensioo home"><Wordmark /></Link>
      <Navigation />
      <Link className="nav-cta" href="/contact">Let’s Talk <ArrowUpRight size={15} /></Link>
    </div></header>
    <main id="content">{children}</main>
    <footer className="footer dark"><div className="wrap">
      <div className="footer-grid">
        <div><Link href="/" aria-label="Dimensioo home"><Wordmark /></Link><p>{brand.tagline}</p>{brand.email && <a href={`mailto:${brand.email}`}>{brand.email}</a>}{brand.phone && <a href={`tel:${brand.phone}`}>{brand.phone}</a>}{brand.instagram && <a href={brand.instagram}>Instagram ↗</a>}</div>
        <div><h2>Explore</h2>{navigation.slice(1).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
        <div><h2>Services</h2>{services.map(service => <Link key={service.slug} href={`/services/${service.slug}`}>{service.name}</Link>)}</div>
      </div>
      <div className="footer-display" aria-hidden="true">Dimensi<span>oo</span></div>
      <div className="footer-end"><span>© {new Date().getFullYear()} Dimensioo</span><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms">Terms and Conditions</Link></div>
    </div></footer>
    <Reveal />
  </body></html>
}
