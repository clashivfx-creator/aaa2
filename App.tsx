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

// Defined locally to use in the button
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 127.14 96.36" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.89,105.89,0,0,0,126.6,80.22c1.24-23.28-13.26-47.57-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'community'>('home');

  return (
    <div className="min-h-screen text-white relative">
      <AnimatedBackground />
      <ScrollProgress />
      <FloatingSocials />
      
      {/* 
        Responsive Navbar: 
        - Mobile: Compact row.
        - Desktop: Transparent layout.
      */}
      <nav className="fixed top-0 w-full z-50 px-4 py-4 md:px-12 md:py-10 flex flex-row justify-between items-center gap-2 md:gap-6 pointer-events-none">
        {/* LOGO WRAPPER: Added background/blur for mobile readability */}
        <div 
          className="cursor-pointer pointer-events-auto shrink-0 bg-black/60 backdrop-blur-xl border border-white/10 p-2 px-4 rounded-2xl shadow-lg md:bg-transparent md:backdrop-blur-none md:border-none md:p-0 md:shadow-none md:rounded-none"
          onClick={() => setActiveTab('home')}
        >
          <FadeIn delay={0}>
            <span className="text-lg md:text-2xl font-bold tracking-[0.2em] uppercase opacity-90 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:opacity-100 transition-opacity">
              ClashiVFX
            </span>
          </FadeIn>
        </div>

        <div className="flex items-center pointer-events-auto">
          {/* 
            WRAPPER FOR BUTTONS:
            - Mobile: Adds a dark, blurred background (island style) so text is readable when scrolling.
            - Desktop (md): Removes background/blur to keep it clean.
          */}
          <FadeIn delay={200} className="
            flex gap-2 
            bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl shadow-lg
            md:gap-6 md:bg-transparent md:backdrop-blur-none md:border-none md:p-0 md:shadow-none md:rounded-none
          ">
            <button 
              onClick={() => setActiveTab('home')}
              className={`
                px-4 py-2 md:px-10 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-2xl font-bold tracking-wider transition-all duration-300
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
                px-4 py-2 md:px-12 md:py-5 rounded-xl md:rounded-2xl text-xs md:text-2xl font-bold tracking-wider transition-all duration-300 shadow-xl flex items-center gap-2
                bg-[#5865F2] hover:bg-[#4752c4] text-white hover:scale-110 hover:shadow-[0_0_30px_rgba(88,101,242,0.6)]
                border border-white/10
              `}
            >
              COMUNIDAD
              <DiscordIcon className="w-3 h-3 md:w-6 md:h-6" />
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