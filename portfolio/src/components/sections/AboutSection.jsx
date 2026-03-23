import { motion } from 'framer-motion'
import { CONFIG } from '../../config/CONFIG'
import profileImg from '../../assets/lanyard/picture.jpeg'

const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif"
const appleFontDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif"

const tags = [
  { label: 'AI / ML Engineer' },
  { label: 'Full-Stack Developer' },
  { label: 'Competitive Programmer' },
]

export function AboutSection({ config = CONFIG }) {
  return (
    <section id="about" className="relative min-h-screen bg-transparent snap-start flex flex-col overflow-hidden">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-28 md:py-36">

        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-6"
          style={{ fontFamily: appleFont }}
        >
          About
        </motion.p>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-[48px] md:text-[72px] lg:text-[88px] font-bold leading-[1] tracking-[-0.04em] text-white mb-16"
          style={{ fontFamily: appleFontDisplay }}
        >
          Crafting intelligence,<br />
          <span className="text-white/25">one model at a time.</span>
        </motion.h2>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Profile Image — centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative overflow-hidden aspect-square w-[220px] md:w-[260px] transition-transform duration-500 hover:scale-105"
              style={{ boxShadow: '0 0 60px rgba(255,255,255,0.2), 0 0 120px rgba(255,255,255,0.05)', border: '3px solid rgba(255,255,255,0.25)' }}
            >
              <img
                src={profileImg}
                alt={config.name}
                className="w-full h-full object-cover object-[50%_30%] scale-[0.85]"
              />
              <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.15)' }} />
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="space-y-8"
          >
            <h3 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] leading-[1.15] text-white"
              style={{ fontFamily: appleFontDisplay }}
            >
              {config.name}
            </h3>

            {/* Lively Tags */}
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold text-white cursor-default transition-all duration-300"
                  style={{
                    fontFamily: appleFont,
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    boxShadow: '0 0 20px rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {tag.label}
                </motion.span>
              ))}
            </div>

            <div className="space-y-5 text-[16px] md:text-[17px] leading-[1.65] text-white/50"
              style={{ fontFamily: appleFont }}
            >
              <p>
                I'm an <span className="text-white/85 font-medium">AI/ML Engineer</span> and{' '}
                <span className="text-white/85 font-medium">Competitive Programmer</span> who
                thrives at the intersection of intelligent systems and elegant code. From training
                deep learning models to solving algorithmic puzzles under pressure — I love the
                craft of turning complex problems into clean, working solutions.
              </p>
              <p>
                My work spans building <span className="text-white/65">multimodal AI pipelines</span>,
                deploying production-grade ML systems, and architecting full-stack applications.
                When I'm not fine-tuning models or shipping features, you'll find me grinding on{' '}
                <span className="text-white/65">Codeforces</span> and{' '}
                <span className="text-white/65">LeetCode</span>, always chasing the next rating milestone.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
