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
import { DiscordLanding } from './components/DiscordLanding';
import { SocialFloating } from './components/SocialFloating';

const DiscordLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
  </svg>
);

type ViewState = 'HOME' | 'COMMUNITY';

function App() {
  const [view, setView] = useState<ViewState>('HOME');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('HOME');
  };

  const handleCommunityClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setView('COMMUNITY');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-white relative">
      <AnimatedBackground />
      <ScrollProgress />
      
      {/* Navbar overlay with Logo and Buttons - Added background for mobile readability */}
      <nav className="fixed top-0 w-full z-50 px-4 md:px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-lg transition-all duration-300">
        <span className="text-sm font-bold tracking-widest uppercase text-white hover:text-purple-400 transition-colors cursor-pointer" onClick={scrollToTop}>
          ClashiVFX
        </span>
        
        <div className="flex gap-3 md:gap-4 items-center">
          <button 
            onClick={scrollToTop}
            className="hidden md:block px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            Inicio
          </button>
          
          {/* Mobile Home Button (Icon only) */}
           <button 
            onClick={scrollToTop}
            className="md:hidden p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10"
            aria-label="Inicio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </button>

          <button 
            onClick={handleCommunityClick}
            className="px-6 py-3 md:px-10 md:py-4 md:text-lg rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold transition-all duration-300 animate-button-attention flex items-center gap-2 group"
          >
            <DiscordLogo className="w-6 h-6 md:w-7 md:h-7" />
            <span>Comunidad</span>
          </button>
        </div>
      </nav>

      <main>
        {view === 'HOME' ? (
          <>
            <Hero />
            <WarningSection />
            <FeaturesGrid />
            <ProgramHighlights />
            <CreatorStory />
            <CreatorsSection />
          </>
        ) : (
          <DiscordLanding />
        )}
      </main>

      {/* Floating Social Icons */}
      <SocialFloating />

      <Footer />
    </div>
  );
}

export default App;