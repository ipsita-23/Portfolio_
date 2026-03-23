import { motion } from 'framer-motion'
import { CONFIG } from '../../config/CONFIG'
import profileImg from '../../assets/profile.png'

export function AboutSection({ config = CONFIG }) {
  return (
    <section id="about" className="relative min-h-screen bg-[#1a1a2e] snap-start flex flex-col justify-center overflow-hidden">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-28 md:py-36">

        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-6"
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif" }}
        >
          About
        </motion.p>

        {/* Main heading — Apple-style large, tight tracking */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-[48px] md:text-[72px] lg:text-[88px] font-bold leading-[1] tracking-[-0.04em] text-white mb-16"
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }}
        >
          Crafting intelligence,<br />
          <span className="text-white/25">one model at a time.</span>
        </motion.h2>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left — Profile Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative rounded-[28px] overflow-hidden aspect-[4/5] max-w-[420px]"
              style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}
            >
              <img
                src={profileImg}
                alt={config.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 rounded-[28px]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }} />
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="space-y-8 lg:pt-8"
          >
            <h3 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] leading-[1.15] text-white"
              style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }}
            >
              {config.name}
            </h3>

            <div className="space-y-5 text-[16px] md:text-[17px] leading-[1.65] text-white/50"
              style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif" }}
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

            {/* Thin separator — Apple style */}
            <div className="w-12 h-[1px] bg-white/10" />

            {/* Minimal meta info */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 text-[13px] text-white/30 tracking-wide"
              style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif" }}
            >
              <div>
                <div className="text-white/60 font-semibold text-[24px] tracking-[-0.02em] mb-1"
                  style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }}
                >
                  AI/ML
                </div>
                <div className="uppercase tracking-[0.15em]">Focus Area</div>
              </div>
              <div>
                <div className="text-white/60 font-semibold text-[24px] tracking-[-0.02em] mb-1"
                  style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }}
                >
                  Full-Stack
                </div>
                <div className="uppercase tracking-[0.15em]">Development</div>
              </div>
              <div>
                <div className="text-white/60 font-semibold text-[24px] tracking-[-0.02em] mb-1"
                  style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }}
                >
                  Competitive
                </div>
                <div className="uppercase tracking-[0.15em]">Programming</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
