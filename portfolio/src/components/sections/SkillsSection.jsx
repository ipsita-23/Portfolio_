import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONFIG } from '../../config/CONFIG'

const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif"
const appleFontDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif"

function SkillBar({ name, value, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group cursor-default"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[14px] font-medium text-white/70 group-hover:text-white/90 transition-colors duration-300"
          style={{ fontFamily: appleFont }}
        >
          {name}
        </span>
        <span className="text-[13px] tabular-nums text-white/30 group-hover:text-white/50 transition-colors duration-300"
          style={{ fontFamily: appleFont }}
        >
          {value}%
        </span>
      </div>
      <div className="h-[6px] w-full rounded-full bg-white/10 relative mt-3 shadow-inner">
        <motion.div
          className="absolute left-0 top-0 bottom-0 rounded-full"
          style={{ 
            background: 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,1))', 
            boxShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 5px rgba(255,255,255,1)' 
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </motion.div>
  )
}

export function SkillsSection({ skills = CONFIG.skills }) {
  const [activeCol, setActiveCol] = useState(0)

  const columns = [
    { title: 'ML & AI', items: skills.columns.mlAi },
    { title: 'DSA', items: skills.columns.dsa || [{ name: 'DSA', value: 86 }] },
    { title: 'Languages', items: skills.columns.languagesCp },
    { title: 'Dev Tools', items: skills.columns.devTools },
  ]

  return (
    <section id="skills" className="relative min-h-screen bg-transparent snap-start flex flex-col">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-12 pb-28 md:pt-16 md:pb-36">

        {/* Apple-style overline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-6"
          style={{ fontFamily: appleFont }}
        >
          Skills
        </motion.p>

        {/* Hero heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-[48px] md:text-[72px] lg:text-[88px] font-bold leading-[1] tracking-[-0.04em] text-white mb-6"
          style={{ fontFamily: appleFontDisplay }}
        >
          What I work with.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[17px] leading-[1.6] text-white/40 max-w-xl mb-20"
          style={{ fontFamily: appleFont }}
        >
          A curated toolkit spanning algorithms, machine learning, languages, and developer infrastructure.
        </motion.p>

        {/* Tab navigation — Apple-style segmented control */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex gap-1 p-1 rounded-xl w-fit mb-16"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 0 20px rgba(255,255,255,0.06)' }}
        >
          {columns.map((col, i) => (
            <button
              key={col.title}
              onClick={() => setActiveCol(i)}
              className={`relative px-8 py-3 rounded-xl text-[14px] font-bold tracking-wide transition-all duration-300 cursor-pointer outline-none min-w-[120px]
                ${activeCol === i ? 'text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              style={{ fontFamily: appleFont }}
            >
              {activeCol === i && (
                <motion.div
                  layoutId="activeSkillTab"
                  className="absolute inset-0 rounded-xl bg-white"
                  style={{
                    boxShadow: '0 0 30px rgba(255,255,255,0.9), 0 0 10px rgba(255,255,255,1)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              )}
              <span className="relative z-10">{col.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills grid with progress bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7">
          {columns[activeCol].items.map((skill, i) => (
            <SkillBar
              key={`${activeCol}-${skill.name}`}
              name={skill.name}
              value={skill.value}
              delay={i * 0.06}
            />
          ))}
        </div>

        {/* Bottom meta */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 pt-8 flex flex-wrap gap-x-16 gap-y-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div>
            <div className="text-white/50 font-semibold text-[28px] tracking-[-0.02em] leading-none mb-1"
              style={{ fontFamily: appleFontDisplay }}
            >
              {columns.length}
            </div>
            <div className="text-[12px] font-medium uppercase tracking-[0.15em] text-white/25"
              style={{ fontFamily: appleFont }}
            >
              Domains
            </div>
          </div>
          <div>
            <div className="text-white/50 font-semibold text-[28px] tracking-[-0.02em] leading-none mb-1"
              style={{ fontFamily: appleFontDisplay }}
            >
              {columns.reduce((sum, col) => sum + col.items.length, 0)}
            </div>
            <div className="text-[12px] font-medium uppercase tracking-[0.15em] text-white/25"
              style={{ fontFamily: appleFont }}
            >
              Technologies
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
