import { motion } from 'framer-motion'
import { Reveal } from '../common/Reveal'

export function AboutSection() {
  const skills = [
    { name: 'React', color: 'from-cyan-400 to-blue-500' },
    { name: 'JavaScript', color: 'from-yellow-400 to-yellow-600' },
    { name: 'HTML5', color: 'from-orange-400 to-red-500' },
    { name: 'CSS3', color: 'from-blue-400 to-indigo-500' },
    { name: 'TailwindCSS', color: 'from-teal-400 to-cyan-500' },
    { name: 'Node.js', color: 'from-green-400 to-emerald-600' },
    { name: 'Python', color: 'from-blue-400 to-yellow-400' },
    { name: 'Three.js', color: 'from-gray-300 to-gray-500' },
  ]

  const features = [
    {
      title: 'Frontend Development',
      desc: 'Building scalable, component-driven web architectures with React and modern tooling.',
      icon: '⚡',
      gradient: 'from-pink-500 to-rose-500',
      shadow: 'hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.3)]',
      border: 'hover:border-pink-500/50',
    },
    {
      title: 'UI Visual Design',
      desc: 'Crafting intuitive, pixel-perfect interfaces with smooth micro-interactions.',
      icon: '✨',
      gradient: 'from-cyan-400 to-blue-500',
      shadow: 'hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.3)]',
      border: 'hover:border-cyan-400/50',
    },
    {
      title: 'Web Performance',
      desc: 'Delivering lightning-fast experiences through dynamic imports and state management.',
      icon: '🚀',
      gradient: 'from-amber-400 to-orange-500',
      shadow: 'hover:shadow-[0_10px_40px_-10px_rgba(251,146,60,0.3)]',
      border: 'hover:border-orange-400/50',
    },
  ]

  return (
    <section id="about" className="relative bg-[#06060e] py-32 overflow-hidden">
      {/* Dynamic Animated Colorful Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[40%] text-right -right-[10%] w-[600px] h-[600px] bg-cyan-500/20 blur-[150px] rounded-full" 
        />
      </div>

      <div className="mx-auto max-w-[1200px] px-5 relative z-10">
        <Reveal className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white text-sm font-jetbrains uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 animate-pulse" />
            About Me
          </div>

          <h2 className="text-[clamp(44px,8vw,96px)] font-bebas font-bold leading-[0.9] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            ENGINEERING THE WEB.
          </h2>

          <p className="text-[#a0a8c0] text-lg sm:text-xl font-medium leading-relaxed font-jetbrains max-w-3xl">
            I am a full-stack engineer and designer specializing in building (and occasionally designing) exceptional digital experiences. Currently focused on building accessible, human-centered products at the intersection of <span className="text-cyan-400 font-bold">aesthetic design</span> and <span className="text-pink-400 font-bold">robust performance</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className="group relative px-5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm font-jetbrains backdrop-blur-md hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-default overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                <span className={`relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${skill.color} transition-all duration-300`}>
                  {skill.name}
                </span>
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className={`group p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-500 shadow-2xl relative overflow-hidden ${feature.shadow} ${feature.border}`}
            >
              {/* Colorful Hover Flare */}
              <div className={`absolute -inset-px bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
              
              <div className={`text-3xl mb-8 w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg text-white font-emoji`}>
                {feature.icon}
              </div>
              <h3 className="text-white font-bold text-2xl mb-4 font-playfair tracking-wide flex items-center gap-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-[#8a94b5] leading-relaxed font-jetbrains text-[15px]">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

