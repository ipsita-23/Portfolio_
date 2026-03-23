import { motion } from 'framer-motion'
import { CONFIG } from '../../config/CONFIG'
import Beams from '../effects/Beams'
import SplitText from '../effects/SplitText'

export function HeroSection({ config = CONFIG }) {
  return (
    <section id="home" className="relative min-h-screen bg-[#07090f] snap-start flex flex-col justify-center">
      <div className="absolute inset-0">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.2),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.2),transparent_30%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-24 md:px-6">
        <div className="text-center">
          <SplitText
            text={`${config.name}.`}
            className="text-5xl font-bold tracking-tight text-white md:text-7xl"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            tag="h1"
          />
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-4 text-gray-400 text-sm md:text-lg font-medium"
          >
            AI/ML Engineer, Competitive Programmer and a part-time developer.
          </motion.h4>
        </div>
      </div>
    </section>
  )
}


