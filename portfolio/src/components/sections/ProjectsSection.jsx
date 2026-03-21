import { motion } from 'framer-motion'
import { Reveal } from '../common/Reveal'
import { CONFIG } from '../../config/CONFIG'

export function ProjectsSection({ projects = CONFIG.projects }) {
  return (
    <section id="projects" className="bg-[#06060e] relative py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-pink-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[1200px] px-5 relative z-10">
        <Reveal className="space-y-4 text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white text-sm font-jetbrains uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 animate-pulse" />
            Portfolio
          </div>
          <h2 className="text-[clamp(44px,8vw,96px)] font-bebas font-bold leading-[0.9] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            FEATURED SHIPS
          </h2>
          <p className="text-[#a0a8c0] text-lg font-jetbrains mt-4">
            A curated selection of my most recent and technically challenging builds.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          {projects.map((p, idx) => {
            const large = idx % 3 === 0
            const spanClass = large ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'
            return (
              <motion.div
                key={p.name}
                whileHover={{ y: -8 }}
                className={`group p-8 flex flex-col rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl transition-all duration-500 shadow-2xl relative overflow-hidden hover:border-pink-500/30 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.15)] ${spanClass}`}
              >
                {/* Hover Gradient Flare */}
                <div className="absolute -inset-px bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start justify-between gap-4 mb-auto">
                  <div className="font-bebas text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-500 text-[32px] leading-none group-hover:from-pink-400 group-hover:to-rose-600 transition-all duration-300">
                    {p.tag}
                  </div>
                  <div className="font-jetbrains text-[#a0a8c0] text-xs px-3 py-1 bg-white/5 rounded-full uppercase">
                    Project
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-bebas text-white text-[44px] leading-[0.92] tracking-wider mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-pink-200 transition-all duration-300">
                    {p.name}
                  </h3>
                  <p className="font-jetbrains text-[#8a94b5] text-[15px] leading-relaxed mb-6">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.techStack.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[#c7d2ff] text-xs font-jetbrains backdrop-blur-md group-hover:border-pink-500/30 group-hover:text-white transition-all cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    <a
                      href={p.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="font-jetbrains text-sm text-white bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-400 transition-all shadow-lg"
                    >
                      GitHub
                    </a>
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="font-jetbrains text-sm text-white bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl hover:bg-white/10 hover:border-pink-500/50 hover:text-pink-400 transition-all shadow-lg"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

