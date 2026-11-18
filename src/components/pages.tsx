import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Aperture, AudioLines, CircleDot, Command, Crosshair, Orbit, ScanLine, Sparkles } from 'lucide-react'
import { approach, brand, influencerProcess, influencers, projects, services, team } from '../content'
import { InquiryForm } from './inquiry-form'
import { Portfolio } from './portfolio'
import { ProfileGrid, ProjectCard } from './visuals'

const symbols = [AudioLines, Orbit, Crosshair, Aperture, Command, ScanLine]
const indexed = (index: number) => String(index + 1).padStart(2, '0')

function Button({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link className={`button ${secondary ? 'secondary' : 'primary'}`} href={href}>{children}<ArrowUpRight size={17} /></Link>
}

function Kicker({ children }: { children: ReactNode }) {
  return <p className="kicker"><span aria-hidden="true" />{children}</p>
}

function StudioCTA() {
  return <section className="studio-cta"><div className="wrap cta-inner" data-reveal>
    <div><Kicker>Let’s talk growth</Kicker><h2>Your next big<br />move starts here.</h2><p>Have a brand to build, a story to tell, or an idea worth amplifying? Let’s make it happen.</p><Button href="/contact">Let’s Talk Growth</Button></div>
    <Orbit className="cta-art" aria-hidden="true" strokeWidth={0.3} />
  </div></section>
}

function Timeline({ steps }: { steps: string[][] }) {
  return <ol className="timeline">{steps.map(([title, copy], index) => <li key={title} data-reveal><span className="mono">{indexed(index)}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
}

function ServiceList() {
  return <div className="service-list">{services.map((service, index) => {
    const Symbol = symbols[index]
    return <Link key={service.slug} className="service-row" style={{ '--service-accent': service.color } as CSSProperties} href={`/services/${service.slug}`}>
      <span className="mono">{indexed(index)}</span><div><h3>{service.name}</h3><p>{service.pitch}</p></div><Symbol className="service-visual" aria-hidden="true" strokeWidth={1} /><ArrowUpRight className="row-arrow" />
    </Link>
  })}</div>
}

const strengths = [
  ['Strategy first', 'We start with the brand, the audience and the business objective. Then we decide what to make.'],
  ['Creativity that connects', 'We look for the idea people can recognize as yours and want to pass on.'],
  ['Culture driven', 'We pay attention to the conversations, formats and communities shaping how people discover brands.'],
  ['Growth focused', 'We connect each creative decision to a business question we can learn from.'],
]

export function Home() {
  return <>
    <section className="hero dark">
      <div className="hero-media" aria-hidden="true"><Image src="/assets/hero.webp" alt="" fill sizes="100vw" priority /></div>
      <div className="hero-grid" aria-hidden="true" />
      <div className="wrap hero-content">
        <Kicker>Independent creative marketing agency</Kicker>
        <h1><span>THINK BIGGER.</span><span className="outline">MARKET</span><span className="accent">SMARTER.</span></h1>
        <p className="hero-copy">We turn ambitious ideas into brands people notice, conversations people join, and growth businesses can measure.</p>
        <div className="actions"><Button href="/contact">Let’s Build Something Big</Button><Button href="/work" secondary>Explore Our Work</Button></div>
      </div>
      <div className="wrap hero-end"><a href="#philosophy" className="scroll"><ArrowDown size={15} /> Scroll to explore</a><span className="mono hero-note">Strategy / Creative / Growth</span></div>
    </section>
    <section className="section paper" id="philosophy"><div className="wrap manifesto" data-reveal>
      <Kicker>The Dimensioo Philosophy</Kicker><div><h2>Good marketing gets attention. <em>Great marketing creates impact.</em></h2><p>We bring strategy, creative, social and creator partnerships together around what you want your brand to do next.</p><Link className="text-link" href="/about">Get to know Dimensioo <ArrowUpRight size={17} /></Link></div>
    </div></section>
    <section className="section dark"><div className="wrap">
      <div className="section-head" data-reveal><div><Kicker>What we do</Kicker><h2>Big ideas.<br />Smarter moves.</h2></div><p>Six connected disciplines, built around the way people discover, trust and choose brands.</p></div>
      <ServiceList />
    </div></section>
    <section className="section paper"><div className="wrap">
      <div className="split"><div data-reveal><Kicker>Why Dimensioo</Kicker><h2>We don’t believe in ordinary.</h2></div><div className="strength-grid">{strengths.map(([title, copy]) => <article key={title} data-reveal><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
    </div></section>
    <section className="section selected"><div className="wrap">
      <div className="section-head" data-reveal><div><Kicker>Selected work</Kicker><h2>Ideas in action.</h2></div><Button href="/work" secondary>View all work</Button></div>
      <div className="project-grid">{projects.slice(0, 2).map(project => <ProjectCard key={project.slug} project={project} />)}</div>
    </div></section>
    <section className="section influencer-band dark"><div className="wrap">
      <div className="split" data-reveal><div><Kicker>Influencer marketing</Kicker><h2>The right voices.<br />The right audience.<br /><em>Real impact.</em></h2></div><div className="influencer-copy"><p>We connect brands with creators who already have a meaningful place in the conversations that matter to their audience.</p><div className="actions"><Button href="/influencers">Explore Influencer Marketing</Button><Button href="/creators" secondary>Join as a Creator</Button></div></div></div>
      <Timeline steps={influencerProcess} />
    </div></section>
    <section className="section paper"><div className="wrap"><Kicker>The Dimensioo Approach</Kicker><h2>From first question<br />to next move.</h2><Timeline steps={approach} /></div></section>
    <StudioCTA />
  </>
}

function InteriorHero({ label, title, copy, variant = '', action }: { label: string; title: string; copy: string; variant?: string; action?: ReactNode }) {
  return <section className={`interior section ${variant}`}><div className="wrap interior-grid"><div><Kicker>{label}</Kicker><h1>{title}</h1></div><div className="interior-aside"><p>{copy}</p>{action}</div></div></section>
}

export function About() {
  return <>
    <InteriorHero label="About Dimensioo" title="We think beyond the expected." copy="Dimensioo is a creative marketing agency working across brand, social, creators and growth." variant="dark about-hero" />
    <section className="section paper"><div className="wrap manifesto"><Kicker>Our point of view</Kicker><div><h2>Good work starts with a better question.</h2><p>What should people remember, feel or do after seeing your brand? We use that question to connect business objectives with ideas that have a place in real culture.</p></div></div></section>
    <section className="section selected"><div className="wrap pair">
      <article><Kicker>Mission</Kicker><h2>Make ambitious ideas work harder.</h2><p>Help brands turn clear thinking and distinctive creative into meaningful action.</p></article>
      <article><Kicker>Vision</Kicker><h2>Make marketing worth paying attention to.</h2><p>Build a practice where brands, creators and communities gain something from working together.</p></article>
    </div></section>
    <section className="section dark"><div className="wrap split"><div><Kicker>Our values</Kicker><h2>How we work.</h2></div><div className="strength-grid">{strengths.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    <section className="section paper"><div className="wrap"><Kicker>The team</Kicker><ProfileGrid profiles={team} /></div></section>
    <StudioCTA />
  </>
}

export function Services() {
  return <>
    <InteriorHero label="Services" title="Everything your brand needs to go further." copy="Choose the discipline you need today, or build a plan that brings several of them together." variant="dark services-hero" />
    <section className="section paper"><div className="wrap catalog">{services.map((service, index) => {
      const Symbol = symbols[index]
      return <article className="catalog-row" key={service.slug} data-reveal style={{ '--service-accent': service.color } as CSSProperties}>
        <div className="catalog-art"><Symbol strokeWidth={0.65} aria-hidden="true" /></div><div><Kicker>{`Service ${indexed(index)}`}</Kicker><h2>{service.name}</h2><p>{service.pitch}</p><ul className="pills">{service.includes.map(item => <li key={item}>{item}</li>)}</ul><Link className="text-link" href={`/services/${service.slug}`}>Explore {service.name} <ArrowUpRight size={17} /></Link></div>
      </article>
    })}</div></section>
    <StudioCTA />
  </>
}

export function ServiceDetail({ service }: { service: typeof services[number] }) {
  const related = services.filter(item => item.slug !== service.slug).slice(0, 3)
  return <>
    <InteriorHero label="Dimensioo Services" title={service.name} copy={service.pitch} variant="dark services-hero" action={<Button href="/contact">Discuss your project</Button>} />
    <section className="section paper"><div className="wrap split"><div><Kicker>The challenge</Kicker><h2>Where we come in.</h2></div><div className="prose"><p>{service.challenge}</p><h3>What we provide</h3><ul>{service.includes.map(item => <li key={item}>{item}</li>)}</ul></div></div></section>
    <section className="section selected"><div className="wrap pair"><article><Kicker>Working process</Kicker><h2>How we get there.</h2><p>{service.process}</p></article><article><Kicker>Potential outcomes</Kicker><h2>What we work toward.</h2><p>{service.outcome}</p></article></div></section>
    <section className="section dark"><div className="wrap"><Kicker>Related services</Kicker><div className="link-list">{related.map(item => <Link key={item.slug} href={`/services/${item.slug}`}>{item.name}<ArrowUpRight /></Link>)}</div></div></section>
    <StudioCTA />
  </>
}

export function Work() {
  return <>
    <InteriorHero label="Our Work" title="Ideas built to make an impact." copy="Explore concept projects across brand, content, creators and digital experiences." variant="work-hero" />
    <section className="section paper portfolio-section"><div className="wrap"><Portfolio /></div></section>
    <StudioCTA />
  </>
}

export function ProjectDetail({ project }: { project: typeof projects[number] }) {
  return <>
    <InteriorHero label={`Concept Project / ${project.category}`} title={project.name} copy={project.type} variant="dark project-hero" />
    <figure className={`case-image project-${project.image}`}><Image src={`/assets/project-${project.image}.webp`} alt={project.alt} fill sizes="100vw" priority /></figure>
    <section className="section paper"><div className="wrap split"><div><Kicker>Concept overview</Kicker><h2>The creative challenge.</h2></div><div className="prose"><p>{project.challenge}</p><h3>Proposed approach</h3><p>{project.strategy}</p><h3>Creative execution</h3><p>{project.execution}</p><h3>Intended outcomes</h3><p>{project.outcome}</p>{project.verifiedResults && <><h3>Verified results</h3><p>{project.verifiedResults}</p></>}</div></div></section>
    {!!project.gallery?.length && <section className="section paper"><div className="wrap"><Kicker>Project gallery</Kicker><div className="project-grid">{project.gallery.map(image => <figure key={image.src} className="project-image"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 610px) 100vw, 50vw" /></figure>)}</div></div></section>}
    <section className="section selected"><div className="wrap"><Kicker>Related work</Kicker><div className="project-grid">{projects.filter(item => item.slug !== project.slug).slice(0, 2).map(item => <ProjectCard key={item.slug} project={item} />)}</div></div></section>
    <StudioCTA />
  </>
}

export function Influencers() {
  return <>
    <InteriorHero label="Influencer Network" title="Influence that means something." copy="We bring brands and creators together around a shared idea, a worthwhile brief, and a clear plan for what happens next." variant="dark influencer-band" action={<Button href="/contact">Discuss a collaboration</Button>} />
    <section className="section paper"><div className="wrap"><Kicker>From discovery to measurement</Kicker><h2>What a partnership takes.</h2><Timeline steps={influencerProcess} /></div></section>
    <section className="section selected"><div className="wrap"><Kicker>Creator profiles</Kicker><ProfileGrid profiles={influencers} creator /><div className="actions"><Button href="/creators" secondary>Join as a Creator</Button></div></div></section>
    <StudioCTA />
  </>
}

export function LeadPage({ creator = false, available }: { creator?: boolean; available: boolean }) {
  return <>
    <InteriorHero label={creator ? 'For Creators' : 'Contact'} title={creator ? 'Your creativity deserves a bigger stage.' : 'Let’s make something remarkable.'} copy={creator ? 'Tell us about your work and the kinds of brands and projects you want to collaborate with.' : 'Tell us what you’re building, what you’re trying to solve, and where you’d like to go next.'} variant={creator ? 'dark influencer-band' : 'contact-hero'} />
    <section className="section paper"><div className="wrap lead-layout">
      <div><Kicker>{creator ? 'Creator applications' : 'Business inquiries'}</Kicker><h2>{creator ? 'Tell us what you make.' : 'Start a conversation.'}</h2>
        {creator ? <><p>We can support campaign coordination, creative partnerships, representation and professional guidance where there’s a fit.</p><p>Share links that show your point of view and the audience you’re building.</p></> : <div className="link-list contact-links">
          {brand.email && <a href={`mailto:${brand.email}`}>Email Dimensioo <ArrowUpRight /></a>}
          {brand.phone && <a href={`tel:${brand.phone}`}>Call Dimensioo <ArrowUpRight /></a>}
          {brand.instagram && <a href={brand.instagram}>Message on Instagram <ArrowUpRight /></a>}
          {brand.booking && <a href={brand.booking}>Book a consultation <ArrowUpRight /></a>}
        </div>}
      </div>
      <InquiryForm creator={creator} available={available} />
    </div></section>
  </>
}

export function LegalPage({ privacy }: { privacy: boolean }) {
  return <>
    <InteriorHero label="Dimensioo" title={privacy ? 'Privacy Policy' : 'Terms and Conditions'} copy={privacy ? 'How information is handled when you visit or contact Dimensioo.' : 'The terms that apply to use of the Dimensioo website.'} variant="dark" />
    <section className="section paper"><div className="wrap prose legal">
      {privacy ? <>
        <h2>Information you share</h2><p>Contact and creator forms ask for information needed to review your message, including contact details, your description, and any social links you choose to provide. Please avoid submitting sensitive personal information.</p>
        <h2>How we use it</h2><p>When submissions are enabled, Dimensioo uses the information to respond to inquiries and assess potential projects or collaborations. Hosting and email providers may process information to deliver the service. Hosting may record technical information for operation and security.</p>
        <h2>Your choices</h2><p>You can choose whether to submit an inquiry. Use the contact page to ask about access, correction, or deletion of information you shared.</p>
      </> : <>
        <h2>Website content</h2><p>This website introduces Dimensioo’s services and illustrates possible approaches. Projects marked as concepts are illustrative. Service scope, responsibilities and fees are agreed separately in writing.</p>
        <h2>Using this site</h2><p>Use the website lawfully and avoid interfering with its operation. Only send information and links you have permission to share. External services have their own terms and privacy policies.</p>
        <h2>Questions</h2><p>Contact Dimensioo if you have questions about this site or its content.</p>
      </>}
      <Link className="text-link" href="/contact">Contact Dimensioo <ArrowUpRight size={17} /></Link>
    </div></section>
  </>
}

export function Missing() {
  return <section className="section dark missing"><div className="wrap"><CircleDot aria-hidden="true" /><Kicker>404 / Page not found</Kicker><h1>Out of bounds.</h1><p>The page you’re looking for may have moved.</p><Button href="/">Back to home</Button><Sparkles className="missing-art" aria-hidden="true" strokeWidth={0.4} /></div></section>
}
