import { CONFIG } from './config/CONFIG'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { HeatmapSection } from './components/sections/HeatmapSection'
import { PlatformsSection } from './components/sections/PlatformsSection'
import { EducationSection } from './components/sections/EducationSection'
import { CertificationsSection } from './components/sections/CertificationsSection'
import { ContactSection } from './components/sections/ContactSection'
import SplashCursor from './components/cursor/SplashCursor'
import { ScrollProgress } from './components/common/ScrollProgress'
import Dock from './components/nav/Dock'
import { Home, User, Code, FolderOpen, GraduationCap, Mail, Trophy, Award } from 'lucide-react'

function App() {
  const scrollTo = (id) => {
    const container = document.getElementById('main-scroller');
    const el = document.getElementById(id);
    if (container && el) {
      container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    }
  };

  const navItems = [
    { icon: <Home size={18} />, label: 'Home', onClick: () => scrollTo('home') },
    { icon: <User size={18} />, label: 'About', onClick: () => scrollTo('about') },
    { icon: <Code size={18} />, label: 'Skills', onClick: () => scrollTo('skills') },
    { icon: <Trophy size={18} />, label: 'CP', onClick: () => scrollTo('cp') },
    { icon: <FolderOpen size={18} />, label: 'Projects', onClick: () => scrollTo('projects') },
    { icon: <Award size={18} />, label: 'Certs', onClick: () => scrollTo('certifications') },
    { icon: <GraduationCap size={18} />, label: 'Education', onClick: () => scrollTo('education') },
    { icon: <Mail size={18} />, label: 'Ping', onClick: () => scrollTo('contact') },
  ];

  return (
    <div id="main-scroller" className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-[#1a1a2e] text-[#e2e8f0] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <SplashCursor />
      <ScrollProgress />
      <main className="relative">
        <HeroSection config={CONFIG} />
        <AboutSection config={CONFIG} />
        <SkillsSection skills={CONFIG.skills} />
        <PlatformsSection />
        <HeatmapSection />
        <ExperienceSection projects={CONFIG.projects} />
        <CertificationsSection config={CONFIG} />
        <EducationSection education={CONFIG.education} />
        <ContactSection config={CONFIG} />
      </main>
      <Dock 
        items={navItems} 
        panelHeight={68} 
        baseItemSize={50} 
        magnification={60} 
        distance={140}
        spring={{ mass: 0.1, stiffness: 110, damping: 15 }} 
      />
    </div>
  )
}

export default App
