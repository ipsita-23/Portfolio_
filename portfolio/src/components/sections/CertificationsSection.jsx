import { motion } from 'framer-motion'
import { Award, ExternalLink, ShieldCheck } from 'lucide-react'
import { CONFIG } from '../../config/CONFIG'

const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif"
const appleFontDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif"

export function CertificationsSection({ config = CONFIG }) {
  const certs = config.certifications || []
  if (certs.length === 0) return null

  return (
    <section id="certifications" className="relative min-h-screen flex flex-col justify-center snap-start bg-[#1a1a2e]">
      <div className="w-full max-w-6xl mx-auto px-6 py-28 md:py-36 relative z-10">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-6"
          style={{ fontFamily: appleFont }}
        >
          Credentials
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-[48px] md:text-[72px] lg:text-[88px] font-bold leading-[1] tracking-[-0.04em] text-white mb-6"
          style={{ fontFamily: appleFontDisplay }}
        >
          Certified expertise.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[17px] leading-[1.6] text-white/40 max-w-xl mb-20"
          style={{ fontFamily: appleFont }}
        >
          Industry-recognized certifications validating continuous learning and technical depth.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="group rounded-2xl p-7 h-full flex flex-col transition-all duration-300 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Award className="w-6 h-6 text-white/30 group-hover:text-white/60 transition-colors" />
                </div>
                {cert.url && cert.url !== '#' && cert.url !== '' && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/20 hover:text-white/60 transition-colors p-1"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>

              <div className="flex-grow flex flex-col justify-end">
                <h3 className="text-[18px] font-bold tracking-[-0.01em] text-white/85 mb-2 leading-snug"
                  style={{ fontFamily: appleFontDisplay }}
                >
                  {cert.title}
                </h3>
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/30 mb-6"
                  style={{ fontFamily: appleFont }}
                >
                  {cert.issuer}
                </p>

                <div className="mt-auto pt-5 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-1.5 text-white/25">
                    <ShieldCheck size={12} className="text-white/30" />
                    <span className="text-[10px] tracking-wider uppercase truncate max-w-[120px]"
                      style={{ fontFamily: appleFont }}
                    >
                      {cert.credentialId}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider text-white/25 uppercase"
                    style={{ fontFamily: appleFont }}
                  >
                    {cert.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
