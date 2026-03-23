import { motion } from 'framer-motion'
import { CONFIG } from '../../config/CONFIG'
import LogoLoop from '../ui/LogoLoop'

const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif"
const appleFontDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif"

export function CertificationsSection({ config = CONFIG }) {
  const certs = config.certifications || []
  if (certs.length === 0) return null

  const logoData = certs.map(cert => ({
    src: cert.image,
    alt: cert.title,
    href: cert.url,
    title: cert.title,
  }))

  return (
    <section id="certifications" className="relative min-h-screen flex flex-col snap-start bg-transparent">
      <div className="w-full max-w-6xl mx-auto px-6 pt-12 pb-28 md:pt-16 md:pb-36 relative z-10">

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full overflow-hidden"
        >
          <LogoLoop
            logos={logoData}
            speed={60}
            direction="left"
            logoHeight={250}
            gap={40}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutColor="#1a1a2e"
            ariaLabel="Certificates"
          />
        </motion.div>
      </div>
    </section>
  )
}
