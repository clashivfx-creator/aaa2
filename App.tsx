
import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowDownCircle } from 'lucide-react';
import { Hero } from './components/Hero';
import { LimitedPacks } from './components/LimitedPacks';
import { WarningSection } from './components/WarningSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { ProgramHighlights } from './components/ProgramHighlights';
import { CreatorStory } from './components/CreatorStory';
import { CreatorsSection } from './components/CreatorsSection';
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { SocialFloatingButtons } from './components/SocialFloatingButtons';

// Internal Discord Icon for the Navbar
const DiscordIconNav = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
  </svg>
);

function App() {
  // Inicializamos en false para permitir la animación de entrada al cargar
  const [showPacksIndicator, setShowPacksIndicator] = useState(false);

  useEffect(() => {
    // Retraso de entrada al cargar para que sea visible
    const entryTimer = setTimeout(() => {
      setShowPacksIndicator(true);
    }, 600);

    const handleScroll = () => {
      const isTop = window.scrollY < 400;
      setShowPacksIndicator(isTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(entryTimer);
    };
  }, []);

  const scrollToPacks = () => {
    const packsSection = document.getElementById('packs');
    if (packsSection) {
      packsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen text-white relative bg-black">
      <AnimatedBackground />
      <ScrollProgress />
      <SocialFloatingButtons />
      
      {/* Floating Limited Packs Indicator - ELEGANT ENTRY FROM LEFT WITH CORRECT BEZIER SYNTAX */}
      <div 
        className={`fixed left-4 top-24 md:left-12 md:top-48 z-40 transition-all duration-1000 transform [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${showPacksIndicator ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-[150%] opacity-0 scale-90 pointer-events-none'}`}
      >
        <button 
          onClick={scrollToPacks}
          className="group flex items-center gap-5 px-8 py-5 md:px-14 md:py-8 rounded-full bg-red-600/40 hover:bg-red-600/60 border-2 border-red-500 backdrop-blur-3xl transition-all shadow-[0_0_50px_rgba(239,68,68,0.5)] hover:shadow-red-500/70 animate-intense-alert"
        >
          <div className="relative flex h-5 w-5 md:h-8 md:w-8">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-90"></span>
            <span className="relative inline-flex rounded-full h-full w-full bg-red-600 shadow-inner"></span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm md:text-2xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">Packs Limitados</span>
            <span className="text-[10px] md:text-xs font-bold text-red-100 uppercase opacity-90 tracking-[0.2em] hidden md:block">¡OFERTA ÚNICA IRREPETIBLE!</span>
          </div>
          <ArrowDownCircle className="w-6 h-6 md:w-10 md:h-10 text-white animate-bounce ml-3" />
        </button>
      </div>
      
      <nav className="fixed top-0 w-full z-50 px-4 md:px-8 py-4 flex justify-between items-center backdrop-blur-sm bg-black/10 border-b border-white/5 transition-all duration-300">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">ClashiVFX</span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <a 
            href="https://e08ff1-xx.myshopify.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-8 md:py-3 rounded-full bg-green-500 hover:bg-green-400 text-white text-xs md:text-base font-bold transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] hover:scale-105"
          >
             <ShoppingBag className="w-4 h-4 md:w-6 md:h-6" />
             <span className="hidden md:inline">TODA LA TIENDA</span>
             <span className="md:hidden">TIENDA</span>
          </a>

          <a 
            href="https://discord.com/invite/zEcFPBqy6s" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-8 md:py-3 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs md:text-base font-bold transition-all animate-pulse-glow-blue shadow-[0_0_15px_rgba(88,101,242,0.4)]"
          >
             <DiscordIconNav className="w-4 h-4 md:w-6 md:h-6" />
             Comunidad
          </a>
        </div>
      </nav>

      <main>
        <Hero />
        <WarningSection />
        <FeaturesGrid />
        <ProgramHighlights />
        <CreatorStory />
        <CreatorsSection />
        <LimitedPacks />
      </main>

      <Footer />
    </div>
  );
}

export default App;
