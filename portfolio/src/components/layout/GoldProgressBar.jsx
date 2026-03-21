import { motion, useSpring, useScroll } from 'framer-motion'

export function GoldProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })

  return (
    <div className="fixed left-0 top-0 z-[60] w-full h-[2px] bg-[#06060e] border-b border-[#8ea0ff]">
      <motion.div
        className="h-full origin-left bg-[#c7d2ff]"
        style={{ scaleX }}
      />
    </div>
  )
}

