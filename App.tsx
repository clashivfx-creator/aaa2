import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { WarningSection } from './components/WarningSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { ProgramHighlights } from './components/ProgramHighlights';
import { CreatorStory } from './components/CreatorStory';
import { CreatorsSection } from './components/CreatorsSection'; 
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { FloatingSocials } from './components/ui/FloatingSocials';
import { CommunityView } from './components/CommunityView';
import { FadeIn } from './components/ui/FadeIn';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'community'>('home');

  return (
    <div className="min-h-screen text-white relative">
      <AnimatedBackground />
      <ScrollProgress />
      <FloatingSocials />
      
      {/* Navbar overlay with Logo and Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-8 md:px-12 md:py-10 flex flex-col md:flex-row justify-between items-center gap-6 pointer-events-none bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <div 
          className="cursor-pointer pointer-events-auto"
          onClick={() => setActiveTab('home')}
        >
          <FadeIn delay={0}>
            <span className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase opacity-90 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:opacity-100 transition-opacity">
              ClashiVFX
            </span>
          </FadeIn>
        </div>

        <div className="flex items-center gap-6 pointer-events-auto">
          <FadeIn delay={200} className="flex gap-6">
            <button 
              onClick={() => setActiveTab('home')}
              className={`
                px-10 py-4 rounded-2xl text-xl md:text-2xl font-bold tracking-wider transition-all duration-300
                ${activeTab === 'home' 
                  ? 'text-white bg-white/10 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 hover:scale-105'}
              `}
            >
              INICIO
            </button>

            <button 
              onClick={() => setActiveTab('community')}
              className={`
                px-12 py-5 rounded-2xl text-xl md:text-2xl font-bold tracking-wider transition-all duration-300 shadow-xl
                bg-[#5865F2] hover:bg-[#4752c4] text-white hover:scale-110 hover:shadow-[0_0_30px_rgba(88,101,242,0.6)]
                border border-white/10
              `}
            >
              COMUNIDAD
            </button>
          </FadeIn>
        </div>
      </nav>

      <main>
        {activeTab === 'home' ? (
          <>
            <Hero />
            <WarningSection />
            <FeaturesGrid />
            <ProgramHighlights />
            <CreatorStory />
            <CreatorsSection />
            <Footer />
          </>
        ) : (
          <CommunityView />
        )}
      </main>
    </div>
  );
}

export default App;