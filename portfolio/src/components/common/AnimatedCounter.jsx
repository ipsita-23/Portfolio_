import { useEffect, useRef, useState } from 'react'

export function useAnimatedCounter(end, duration = 1500) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const target = Number(end) || 0
          if (target === 0) { setCount(0); return }

          const startTime = performance.now()
          const animate = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return { count, ref }
}

export function AnimatedNumber({ value, duration = 1500, className = '', style = {} }) {
  const { count, ref } = useAnimatedCounter(value, duration)
  return <span ref={ref} className={className} style={style}>{count}</span>
}
