import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const scroller = document.getElementById('main-scroller')
    if (!scroller) return

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scroller
      const total = scrollHeight - clientHeight
      if (total > 0) {
        setProgress((scrollTop / total) * 100)
      }
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[2px] pointer-events-none">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.4))',
        }}
      />
    </div>
  )
}
