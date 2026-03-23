import { motion } from 'framer-motion'

const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif"
const appleFontDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif"

export function ExperienceSection({ projects = [] }) {
  return (
    <section id="projects" className="relative min-h-screen bg-[#1a1a2e] snap-start flex flex-col justify-center">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-28 md:py-36">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-6"
          style={{ fontFamily: appleFont }}
        >
          Projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-[48px] md:text-[72px] lg:text-[88px] font-bold leading-[1] tracking-[-0.04em] text-white mb-6"
          style={{ fontFamily: appleFontDisplay }}
        >
          Selected builds.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[17px] leading-[1.6] text-white/40 max-w-xl mb-20"
          style={{ fontFamily: appleFont }}
        >
          A curated collection of projects spanning AI, systems engineering, and full-stack development.
        </motion.p>

        <div className="space-y-5">
          {projects.length > 0 ? (
            projects.map((item, i) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="group rounded-2xl p-7 md:p-8 transition-all duration-300 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <h3 className="text-[22px] md:text-[26px] font-bold tracking-[-0.02em] text-white/90 group-hover:text-white transition-colors"
                    style={{ fontFamily: appleFontDisplay }}
                  >
                    {item.name}
                  </h3>
                  <span className="text-[12px] font-medium text-white/25 tracking-wide pt-1"
                    style={{ fontFamily: appleFont }}
                  >
                    {item.techStack?.join(' · ')}
                  </span>
                </div>

                <p className="text-[15px] leading-[1.65] text-white/45 mb-6"
                  style={{ fontFamily: appleFont }}
                >
                  {item.description}
                </p>

                <div className="flex items-center gap-6">
                  {item.links?.github && item.links.github !== '#' && (
                    <a href={item.links.github} target="_blank" rel="noreferrer"
                      className="text-[13px] font-semibold tracking-wide text-white/40 hover:text-white/80 transition-colors duration-300"
                      style={{ fontFamily: appleFont }}
                    >
                      GitHub ↗
                    </a>
                  )}
                  {item.links?.live && item.links.live !== '#' && (
                    <a href={item.links.live} target="_blank" rel="noreferrer"
                      className="text-[13px] font-semibold tracking-wide text-white/40 hover:text-white/80 transition-colors duration-300"
                      style={{ fontFamily: appleFont }}
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </motion.article>
            ))
          ) : (
            <div className="rounded-2xl p-8 text-white/30 text-[15px]"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: appleFont }}
            >
              Add your project entries in src/config/CONFIG.js under projects.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
