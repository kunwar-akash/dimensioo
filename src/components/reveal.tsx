'use client'

import { useEffect } from 'react'

export function Reveal() {
  useEffect(() => {
    const main = document.querySelector('main')
    if (!main || !('IntersectionObserver' in window)) return

    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const selector = '[data-reveal]:not(.revealed)'
    const observer = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue
        if (motion.matches) target.classList.add('revealed')
        observer.unobserve(target)
      }
    }, { rootMargin: '0px 0px -24px 0px', threshold: 0.06 })

    const observe = () => {
      if (motion.matches) main.querySelectorAll(selector).forEach(node => observer.observe(node))
      else observer.disconnect()
    }
    const mutations = new MutationObserver(records => {
      for (const record of records) {
        record.removedNodes.forEach(node => {
          if (!(node instanceof Element) || node.isConnected) return
          observer.unobserve(node)
          node.querySelectorAll(selector).forEach(child => observer.unobserve(child))
        })
      }
      observe()
    })

    observe()
    mutations.observe(main, { childList: true, subtree: true })
    motion.addEventListener('change', observe)
    return () => {
      observer.disconnect()
      mutations.disconnect()
      motion.removeEventListener('change', observe)
    }
  }, [])
  return null
}
