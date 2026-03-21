import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONFIG } from '../../config/CONFIG'
import { Reveal } from '../common/Reveal'

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

function IconLink({ href, label, children }) {
  return (
    <motion.a
      whileHover={{ y: -4, scale: 1.05 }}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-cyan-400/50 hover:bg-white/[0.08] transition-all shadow-lg"
      aria-label={label}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
      <div className="relative z-10 text-white group-hover:text-cyan-400 transition-colors">
        {children}
      </div>
    </motion.a>
  )
}

export function ContactSection({ config = CONFIG }) {
  const [copied, setCopied] = useState(false)

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
    <section id="contact" className="bg-[#06060e] relative py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-600/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[1200px] px-5 relative z-10 pb-20">
        <Reveal className="flex flex-col items-center text-center space-y-12 bg-white/[0.02] border border-white/10 p-12 md:p-20 rounded-[3rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Inner Light Flare */}
          <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-50" />

          <div className="space-y-4">
            <h2 className="font-bebas text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-cyan-500 text-[clamp(64px,10vw,140px)] leading-[0.85] tracking-tight drop-shadow-[0_0_40px_rgba(34,211,238,0.2)]">
              LET'S BUILD.
            </h2>
            <p className="font-jetbrains text-[#8a94b5] text-lg max-w-xl mx-auto">
              Open for accelerating your team, consulting, or highly challenging engineering problems. Let's make it happen.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 w-full max-w-md">
            <button
              type="button"
              onClick={onCopy}
              className={[
                'group relative w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 overflow-hidden',
                copied
                  ? 'bg-cyan-500/10 border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.2)] text-white'
                  : 'bg-white/[0.03] border-white/10 hover:border-cyan-400/30 hover:bg-white/[0.06] text-white'
              ].join(' ')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

              <span className="font-jetbrains font-bold text-lg sm:text-xl truncate px-2 relative z-10">
                {config.email}
              </span>
              <span className={`px-4 py-2 rounded-xl font-jetbrains text-xs font-bold tracking-widest uppercase transition-colors relative z-10 ${copied ? 'bg-cyan-400 text-[#06060e]' : 'bg-white/10 group-hover:bg-cyan-400 group-hover:text-[#06060e]'}`}>
                {copied ? 'COPIED!' : 'COPY EMAIL'}
              </span>
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white font-jetbrains font-bold tracking-widest text-sm uppercase overflow-hidden backdrop-blur-md hover:border-cyan-400/30 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
              <span className="relative z-10 flex items-center gap-3 group-hover:text-cyan-400 transition-colors duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                DOWNLOAD RESUME
              </span>
            </a>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <IconLink href={config.socials.github} label="GitHub">
                <IconGitHub className="w-6 h-6" />
              </IconLink>
              <IconLink href={config.socials.linkedin} label="LinkedIn">
                <IconLinkedIn className="w-6 h-6" />
              </IconLink>
              <IconLink href={config.socials.codeforces} label="Codeforces">
                <IconCodeforces className="w-6 h-6" />
              </IconLink>
              <IconLink href={config.socials.codechef} label="CodeChef">
                <IconCodeChef className="w-6 h-6" />
              </IconLink>
              <IconLink href={config.socials.leetcode} label="LeetCode">
                <IconLeetCode className="w-6 h-6" />
              </IconLink>
              <IconLink href={config.socials.twitterX} label="Twitter/X">
                <IconX className="w-6 h-6" />
              </IconLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

