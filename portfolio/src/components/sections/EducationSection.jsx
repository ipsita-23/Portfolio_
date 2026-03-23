import { motion } from 'framer-motion'

const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif"
const appleFontDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif"

export function EducationSection({ education = [] }) {
  return (
    <section id="education" className="relative min-h-screen bg-transparent snap-start flex flex-col">
      <div className="relative mx-auto w-full max-w-6xl px-6 pt-12 pb-28 md:pt-16 md:pb-36">

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
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white/30" style={{ boxShadow: '0 0 20px rgba(255,255,255,0.6)' }} />

          <div className="space-y-14">
            {education.length > 0 ? (
              education.map((item, index) => (
                <motion.article
                  key={`${item.institution}-${item.degree}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <span className="absolute -left-[38px] top-6 flex h-4 w-4 -translate-x-[2px] items-center justify-center z-10 hidden md:flex">
                    <span className="h-4 w-4 rounded-full bg-white transition-transform duration-300 group-hover:scale-150" style={{ boxShadow: '0 0 20px rgba(255,255,255,1)' }}></span>
                  </span>

                  {/* Card container */}
                  <div className="p-6 md:p-8 rounded-2xl transition-all duration-500 bg-white/[0.02] border border-white/[0.08] group-hover:bg-white/[0.06] group-hover:border-white/[0.2] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] group-hover:-translate-y-1 ml-0 md:ml-4">
                    <h3 className="text-[22px] md:text-[28px] font-bold tracking-[-0.02em] text-white/90 group-hover:text-white transition-colors mb-4 drop-shadow-md"
                      style={{ fontFamily: appleFontDisplay }}
                    >
                      {item.degree}
                    </h3>
  
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span className="text-[12px] font-bold text-white tracking-wider px-3.5 py-1.5 rounded-full shadow-lg"
                        style={{ fontFamily: appleFont, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 0 15px rgba(255,255,255,0.1)' }}
                      >
                        {item.period}
                      </span>
                      {item.details && (
                        <span className="text-[12px] font-bold text-white tracking-wider px-3.5 py-1.5 rounded-full shadow-lg"
                          style={{ fontFamily: appleFont, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 0 15px rgba(255,255,255,0.1)' }}
                        >
                          {item.details}
                        </span>
                      )}
                    </div>
  
                    <p className="text-[16px] text-white/60 group-hover:text-white/90 transition-colors flex items-center gap-2"
                      style={{ fontFamily: appleFont }}
                    >
                      <svg className="w-5 h-5 text-white flex-shrink-0 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {item.institution}
                    </p>
                  </div>
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
