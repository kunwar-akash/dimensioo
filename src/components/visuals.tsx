import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { projects, type Profile } from '../content'

export function ProjectCard({ project }: { project: typeof projects[number] }) {
  return <Link className="project" data-reveal href={`/work/${project.slug}`}>
    <div className={`project-image project-${project.slug}`}><Image src={project.cover} alt={project.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /><span className="project-tag">Concept Project</span><span className="project-arrow"><ArrowUpRight /></span></div>
    <div className="project-caption"><h3>{project.name}</h3><p>{project.category} / {project.type}</p></div>
  </Link>
}

export function ProfileGrid({ profiles, creator }: { profiles: Profile[]; creator?: boolean }) {
  if (!profiles.length) return <div className="profile-empty"><span className="profile-symbol" aria-hidden="true">✳</span><div><h3>{creator ? 'Creator profiles coming soon' : 'Team profiles coming soon'}</h3><p>{creator ? 'Talk to us about the creator brief you have in mind.' : 'Get to know us through a conversation about your brand.'}</p></div></div>
  return <div className="project-grid">{profiles.map(profile => <article className="profile-empty" key={profile.name}>
    {profile.image && <Image src={profile.image} alt={profile.name} width={100} height={100} />}
    <div><h3>{profile.name}</h3><p>{[profile.platform, profile.category, profile.location].filter(Boolean).join(' · ')}</p><p>{profile.bio}</p>
      {profile.audience && <p>Audience {profile.audience}</p>}{profile.engagement && <p>Engagement {profile.engagement}</p>}
      {profile.links?.map(link => <a key={link.url} href={link.url}>{link.label} ↗ </a>)}
    </div>
  </article>)}</div>
}
