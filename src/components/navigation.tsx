'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigation } from '../content'

export function Navigation() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const mobile = window.matchMedia('(max-width: 860px)')
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, footer'))
      .filter(element => !element.inert)
    background.forEach(element => { element.inert = true })

    const closeOnDesktop = () => { if (!mobile.matches) setOpen(false) }
    const closeOnHeaderLink = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('.header a')) setOpen(false)
    }
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        document.getElementById('menu-toggle')?.focus()
      }
    }
    window.addEventListener('keydown', close)
    window.addEventListener('click', closeOnHeaderLink, true)
    mobile.addEventListener('change', closeOnDesktop)
    return () => {
      window.removeEventListener('keydown', close)
      window.removeEventListener('click', closeOnHeaderLink, true)
      mobile.removeEventListener('change', closeOnDesktop)
      background.forEach(element => { element.inert = false })
    }
  }, [open])
  return <>
    <button id="menu-toggle" className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav aria-label="Primary navigation" id="primary-nav" className={open ? 'nav open' : 'nav'}>
      {navigation.map(([name, href]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}>{name}</Link>)}
    </nav>
  </>
}
