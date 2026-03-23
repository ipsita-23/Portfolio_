import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONFIG } from '../../config/CONFIG'

const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif"
const appleFontDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif"

function IconGitHub({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M12 .5C5.73.5.5 5.78.5 12.13c0 5.1 3.29 9.43 7.86 10.95c.58.11.79-.26.79-.58v-2.12c-3.2.7-3.88-1.56-3.88-1.56c-.52-1.33-1.27-1.68-1.27-1.68c-1.04-.72.08-.71.08-.71c1.15.08 1.75 1.2 1.75 1.2c1.02 1.77 2.67 1.26 3.32.96c.1-.74.4-1.26.72-1.55c-2.56-.3-5.25-1.32-5.25-5.86c0-1.29.45-2.34 1.18-3.17c-.12-.3-.51-1.51.11-3.15c0 0 .97-.32 3.18 1.2c.92-.26 1.9-.39 2.87-.39s1.95.13 2.87.39c2.21-1.52 3.18-1.2 3.18-1.2c.62 1.64.23 2.85.11 3.15c.73.83 1.18 1.88 1.18 3.17c0 4.55-2.7 5.56-5.27 5.86c.41.36.78 1.1.78 2.22v3.29c0 .32.21.7.8.58c4.56-1.52 7.85-5.85 7.85-10.95C23.5 5.78 18.27.5 12 .5Z" />
    </svg>
  )
}

function IconLinkedIn({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M20.45 20.45H17.1v-5.4c0-1.29-.03-2.95-1.8-2.95c-1.8 0-2.08 1.4-2.08 2.86v5.49H9.87V9h3.18v1.56h.04c.44-.84 1.53-1.73 3.15-1.73c3.36 0 3.98 2.21 3.98 5.07v6.49ZM5.34 7.43c-.99 0-1.81-.82-1.81-1.82S4.35 3.8 5.34 3.8s1.81.82 1.81 1.81s-.82 1.82-1.81 1.82ZM6.97 20.45H3.72V9h3.25v11.45Z" />
    </svg>
  )
}

function IconCodeforces({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M12 2l7.5 4.5v11L12 22l-7.5-4.5v-11L12 2Zm0 2.2L6.5 7v10l5.5 2.8l5.5-2.8V7L12 4.2Zm-1 3.4h2v6.8h-2V7.6Zm0 8.3h2v2h-2v-2Z" />
    </svg>
  )
}

function IconLeetCode({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M7 2h10v2H7V2Zm0 4h10v2H7V6Zm-2 6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V12Zm5 2.6L8.4 18l2.2 2.6L12 18.2l1.4 2.4l2.2-2.6l-1.6-3.4l1.6-3.4l-2.2-2.6L12 11.8L10.6 9.4L8.4 12l1.6 2.6Z" />
    </svg>
  )
}

function IconX({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M18.9 2H22l-6.8 7.8L23 22h-6.8l-4.2-6.2L5 22H2l7.4-8.5L1 2h7l3.8 5.5L18.9 2Zm-1.2 18h1.7L6.2 3.9H4.4L17.7 20Z" />
    </svg>
  )
}

function IconCodeChef({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M8 10l6 4-6 4" />
      <path d="M16 10v8" />
    </svg>
  )
}

function SocialLink({ href, label, children }) {
  return (
    <motion.a
      whileHover={{ y: -4, scale: 1.15, boxShadow: '0 0 25px rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.6)' }}
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex h-12 w-12 items-center justify-center rounded-2xl text-white/50 hover:text-white transition-colors duration-300"
      style={{ 
        background: 'rgba(255,255,255,0.06)', 
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 0 15px rgba(255,255,255,0.05)',
        backdropFilter: 'blur(8px)',
      }}
      aria-label={label}
    >
      {children}
    </motion.a>
  )
}

export function ContactSection({ config = CONFIG }) {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('idle')

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(config.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 900)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = config.email
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 900)
    }
  }

  return (
    <section id="contact" className="relative min-h-screen bg-transparent snap-start flex flex-col">
      <div className="relative mx-auto w-full max-w-5xl px-6 pt-12 pb-28 md:pt-16 md:pb-36">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-6"
          style={{ fontFamily: appleFont }}
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-[48px] md:text-[72px] lg:text-[88px] font-bold leading-[1] tracking-[-0.04em] text-white mb-6"
          style={{ fontFamily: appleFontDisplay }}
        >
          Let's connect.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[17px] leading-[1.6] text-white/40 max-w-xl mb-16"
          style={{ fontFamily: appleFont }}
        >
          Open to impactful opportunities in AI/ML, backend systems, and performance engineering.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault();
                setStatus('submitting');
                const fd = new FormData(e.target);
                fd.append("access_key", config.web3formsKey || "YOUR_ACCESS_KEY_HERE");
                try {
                  const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
                  const data = await res.json();
                  if (data.success) { setStatus('success'); e.target.reset(); setTimeout(() => setStatus('idle'), 5000); }
                  else { setStatus('error'); setTimeout(() => setStatus('idle'), 5000); }
                } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 5000); }
              }}
            >
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/25 pl-1"
                  style={{ fontFamily: appleFont }}
                >Name</label>
                <input type="text" name="name" required disabled={status === 'submitting'}
                  className="w-full rounded-2xl px-5 py-4 text-[15px] font-medium text-white/90 focus:outline-none transition-all duration-300 disabled:opacity-50"
                  style={{
                    fontFamily: appleFont,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.02)',
                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.border = '1px solid rgba(255,255,255,0.5)';
                    e.target.style.boxShadow = '0 0 25px rgba(255,255,255,0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.05)';
                    e.target.style.border = '1px solid rgba(255,255,255,0.15)';
                    e.target.style.boxShadow = 'inset 0 2px 5px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.02)';
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/25 pl-1"
                  style={{ fontFamily: appleFont }}
                >Email</label>
                <input type="email" name="email" required disabled={status === 'submitting'}
                  className="w-full rounded-2xl px-5 py-4 text-[15px] font-medium text-white/90 focus:outline-none transition-all duration-300 disabled:opacity-50"
                  style={{
                    fontFamily: appleFont,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.02)',
                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.border = '1px solid rgba(255,255,255,0.5)';
                    e.target.style.boxShadow = '0 0 25px rgba(255,255,255,0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.05)';
                    e.target.style.border = '1px solid rgba(255,255,255,0.15)';
                    e.target.style.boxShadow = 'inset 0 2px 5px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.02)';
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/25 pl-1"
                  style={{ fontFamily: appleFont }}
                >Message</label>
                <textarea name="message" required rows={4} disabled={status === 'submitting'}
                  className="w-full rounded-2xl px-5 py-4 text-[15px] font-medium text-white/90 focus:outline-none transition-all duration-300 disabled:opacity-50 resize-none"
                  style={{
                    fontFamily: appleFont,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.02)',
                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.border = '1px solid rgba(255,255,255,0.5)';
                    e.target.style.boxShadow = '0 0 25px rgba(255,255,255,0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.05)';
                    e.target.style.border = '1px solid rgba(255,255,255,0.15)';
                    e.target.style.boxShadow = 'inset 0 2px 5px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.02)';
                  }}
                ></textarea>
              </div>
              <motion.button
                whileHover={status === 'idle' ? { scale: 1.02, boxShadow: '0 0 30px rgba(255,255,255,0.25)', borderColor: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.12)' } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full py-4 mt-6 rounded-2xl text-[15px] font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${
                  status === 'success' || status === 'error' ? 'text-white/60' : 'text-white'
                }`}
                style={{
                  fontFamily: appleFont,
                  background: status === 'idle' || status === 'submitting' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 0 15px rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {status === 'submitting' && <span className="w-4 h-4 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />}
                {status === 'success' && 'Message sent!'}
                {status === 'error' && 'Something went wrong'}
                {(status === 'idle' || status === 'submitting') && 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onCopy}
              className="w-full rounded-2xl px-6 py-5 text-left transition-all duration-300 cursor-pointer"
              style={{
                background: copied ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                border: copied ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.15)',
                boxShadow: copied ? '0 0 20px rgba(255,255,255,0.2)' : '0 0 15px rgba(255,255,255,0.03)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="truncate text-[15px] font-medium text-white/60" style={{ fontFamily: appleFont }}>
                  {config.email}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30 flex-shrink-0"
                  style={{ fontFamily: appleFont }}
                >
                  {copied ? 'Copied' : 'Copy'}
                </span>
              </div>
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.98 }}
              href="/UPDATED_CV_IPSITA.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-2xl px-6 py-5 text-center text-[15px] font-bold text-white/70 hover:text-white transition-all duration-300"
              style={{
                fontFamily: appleFont,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 0 15px rgba(255,255,255,0.03)',
                backdropFilter: 'blur(8px)',
              }}
            >
              Download Resume
            </motion.a>

            <div className="w-10 h-px bg-white/[0.06] my-2" />

            <div className="flex flex-wrap items-center gap-2.5">
              <SocialLink href={config.socials.github} label="GitHub"><IconGitHub className="h-4 w-4" /></SocialLink>
              <SocialLink href={config.socials.linkedin} label="LinkedIn"><IconLinkedIn className="h-4 w-4" /></SocialLink>
              <SocialLink href={config.socials.codeforces} label="Codeforces"><IconCodeforces className="h-4 w-4" /></SocialLink>
              <SocialLink href={config.socials.codechef} label="CodeChef"><IconCodeChef className="h-4 w-4" /></SocialLink>
              <SocialLink href={config.socials.leetcode} label="LeetCode"><IconLeetCode className="h-4 w-4" /></SocialLink>
              <SocialLink href={config.socials.twitterX} label="Twitter/X"><IconX className="h-4 w-4" /></SocialLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
