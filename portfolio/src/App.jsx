import { CONFIG } from './config/CONFIG'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { PlatformsSection } from './components/sections/PlatformsSection'
import { HeatmapSection } from './components/sections/HeatmapSection'
import { ContactSection } from './components/sections/ContactSection'

function App() {
  return (
    <div className="bg-[#06060e] text-[#f0f0f8]">
      <main className="relative">
        <HeroSection />
        <AboutSection aboutStats={CONFIG.about} />
        <SkillsSection skills={CONFIG.skills} />
        <ProjectsSection projects={CONFIG.projects} />
        <PlatformsSection />
        <HeatmapSection />
        <ContactSection config={CONFIG} />
      </main>
    </div>
  )
}

export default App
