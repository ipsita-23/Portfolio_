import { motion } from 'framer-motion'

const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif"
const appleFontDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif"

export function EducationSection({ education = [] }) {
  return (
    <section id="education" className="relative min-h-screen bg-[#1a1a2e] snap-start flex flex-col justify-center">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-28 md:py-36">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-6"
          style={{ fontFamily: appleFont }}
        >
          Education
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-[48px] md:text-[72px] lg:text-[88px] font-bold leading-[1] tracking-[-0.04em] text-white mb-20"
          style={{ fontFamily: appleFontDisplay }}
        >
          Academic journey.
        </motion.h2>

        {/* Timeline */}
        <div className="relative pl-8 ml-4 md:ml-6">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.08]" />

          <div className="space-y-14">
            {education.length > 0 ? (
              education.map((item, index) => (
                <motion.article
                  key={`${item.institution}-${item.degree}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <span className="absolute -left-8 top-2 flex h-3 w-3 -translate-x-[5px] items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-white/30"></span>
                  </span>

                  <h3 className="text-[22px] md:text-[28px] font-bold tracking-[-0.02em] text-white/90 mb-3"
                    style={{ fontFamily: appleFontDisplay }}
                  >
                    {item.degree}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-[12px] font-medium text-white/35 tracking-wide px-3 py-1 rounded-full"
                      style={{ fontFamily: appleFont, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      {item.period}
                    </span>
                    {item.details && (
                      <span className="text-[12px] font-medium text-white/35 tracking-wide px-3 py-1 rounded-full"
                        style={{ fontFamily: appleFont, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        {item.details}
                      </span>
                    )}
                  </div>

                  <p className="text-[15px] text-white/40 flex items-center gap-2"
                    style={{ fontFamily: appleFont }}
                  >
                    <svg className="w-4 h-4 text-white/20 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {item.institution}
                  </p>
                </motion.article>
              ))
            ) : (
              <div className="text-white/30 text-[15px]" style={{ fontFamily: appleFont }}>
                Add your education entries in src/config/CONFIG.js under education.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
