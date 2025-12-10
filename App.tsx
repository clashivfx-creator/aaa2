import React from 'react';
import { Hero } from './components/Hero';
import { WarningSection } from './components/WarningSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { ProgramHighlights } from './components/ProgramHighlights';
import { CreatorStory } from './components/CreatorStory';
import { CreatorsSection } from './components/CreatorsSection'; // Import added
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { ScrollProgress } from './components/ui/ScrollProgress';

function App() {
  return (
    <div className="min-h-screen text-white relative">
      <AnimatedBackground />
      <ScrollProgress />
      
      {/* Navbar overlay with Logo */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
        <span className="text-sm font-bold tracking-widest uppercase opacity-80 text-white">ClashiVFX</span>
      </nav>

      <main>
        <Hero />
        <WarningSection />
        <FeaturesGrid />
        <ProgramHighlights />
        <CreatorStory />
        <CreatorsSection /> {/* Section added */}
      </main>

      <Footer />
    </div>
  );
}

export default App;