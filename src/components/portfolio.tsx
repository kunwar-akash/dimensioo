'use client'

import { useState } from 'react'
import { projects } from '../content'
import { ProjectCard } from './visuals'

export function Portfolio() {
  const [filter, setFilter] = useState('All work')
  return <>
    <div className="filters" role="group" aria-label="Filter portfolio">
      {['All work', ...new Set(projects.map(project => project.category))].map(category => <button key={category} className="chip" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}
    </div>
    <div className="project-grid" aria-live="polite">{projects.filter(project => filter === 'All work' || project.category === filter).map(project => <ProjectCard key={project.slug} project={project} />)}</div>
  </>
}
