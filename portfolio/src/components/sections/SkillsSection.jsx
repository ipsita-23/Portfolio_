import { motion } from 'framer-motion'
import { Reveal } from '../common/Reveal'

export function SkillsSection() {
  const categories = [
    {
      title: 'Frontend Architecture',
      icon: '🎨',
      gradient: 'from-cyan-400 to-blue-500',
      shadow: 'hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.3)]',
      border: 'hover:border-cyan-400/50',
      skills: [
        { name: 'React', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'HTML5 / CSS3', level: 90 },
        { name: 'TailwindCSS', level: 95 },
        { name: 'Three.js', level: 70 },
      ]
    },
    {
      title: 'Backend Systems',
      icon: '⚙️',
      gradient: 'from-purple-500 to-pink-500',
      shadow: 'hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.3)]',
      border: 'hover:border-purple-500/50',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 90 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'MongoDB', level: 85 },
        { name: 'REST APIs', level: 95 },
        { name: 'GraphQL', level: 75 },
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: '🛠️',
      gradient: 'from-amber-400 to-orange-500',
      shadow: 'hover:shadow-[0_10px_40px_-10px_rgba(251,146,60,0.3)]',
      border: 'hover:border-orange-400/50',
      skills: [
        { name: 'Git & GitHub', level: 95 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 70 },
        { name: 'Vercel', level: 90 },
        { name: 'Linux', level: 85 },
        { name: 'CI/CD', level: 75 },
      ]
    }
  ]

  return (
    <section id="skills" className="relative bg-[#06060e] py-32 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[1200px] px-5 relative z-10">
        <Reveal className="space-y-4 text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white text-sm font-jetbrains uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse" />
            My Arsenal
          </div>
          <h2 className="text-[clamp(44px,8vw,96px)] font-bebas font-bold leading-[0.9] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#c7d2ff] to-[#8ea0ff]">
            TECHNICAL SKILLS
          </h2>
          <p className="text-[#a0a8c0] text-lg font-jetbrains mt-4">
            A comprehensive overview of the languages, frameworks, and tools I use to build robust and scalable systems.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className={`group p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl transition-all duration-500 shadow-2xl relative overflow-hidden ${category.shadow} ${category.border}`}
            >
              {/* Card Gradient Flare */}
              <div className={`absolute -inset-px bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
              
              <div className="flex items-center gap-4 mb-8">
                <div className={`text-2xl w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} shadow-lg text-white font-emoji`}>
                  {category.icon}
                </div>
                <h3 className="text-[#f0f0f8] font-bold text-xl font-playfair tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm font-jetbrains mb-3">
                      <span className="text-[#c7d2ff] group-hover:text-white transition-colors">{skill.name}</span>
                      <span className="text-[#8a94b5]">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${category.gradient}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

