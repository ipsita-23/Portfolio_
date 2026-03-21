import Lanyard from '../effects/Lanyard'
import GooeyNav from '../nav/GooeyNav'

export function HeroSection() {
  const items = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Work', href: '#projects' },
    { label: 'Stats', href: '#platforms' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <section id="home" className="relative bg-[#06060e] min-h-svh overflow-hidden">
      <div className="absolute inset-0">
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-8 w-full">
        <h1 className="font-bebas text-[#c7d2ff] text-[clamp(42px,7vw,92px)] leading-none tracking-[0.12em] drop-shadow-[0_0_18px_rgba(199,210,255,0.28)] text-center">
          IPSITA UMANG
        </h1>
      </div>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>
    </section>
  )
}

