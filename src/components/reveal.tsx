'use client'

import { useEffect } from 'react'

export function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(items => {
      items.forEach(item => {
        if (item.isIntersecting) {
          item.target.classList.add('revealed')
          observer.unobserve(item.target)
        }
      })
    }, { threshold: 0.12 })
    const observe = () => {
      observer.disconnect()
      document.querySelectorAll('[data-reveal]:not(.revealed)').forEach(node => observer.observe(node))
    }
    observe()
    const mutations = new MutationObserver(observe)
    const main = document.querySelector('main')
    if (main) mutations.observe(main, { childList: true, subtree: true })
    return () => { observer.disconnect(); mutations.disconnect() }
  }, [])
  return null
}
