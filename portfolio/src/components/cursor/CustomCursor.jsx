import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef(null)
  const rafRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const coarse = window.matchMedia?.('(pointer: coarse)')?.matches
    if (coarse) return

    const el = cursorRef.current
    if (!el) return

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(() => {
          rafRef.current = null
          // Simple easing to keep motion heavy and controlled.
          pos.current.x += (target.current.x - pos.current.x) * 0.35
          pos.current.y += (target.current.y - pos.current.y) * 0.35
          el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
        })
      }
    }

    const onEnter = () => {
      el.style.opacity = '1'
    }

    const onLeave = () => {
      el.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener('mouseleave', onLeave)
    onEnter()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mouseleave', onLeave)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 opacity-0"
      style={{
        transform: 'translate3d(0px,0px,0)',
        background: '#c7d2ff',
        border: '1px solid #8ea0ff',
        boxShadow: '0 0 0 1px rgba(199,210,255,0.1)',
      }}
    />
  )
}

