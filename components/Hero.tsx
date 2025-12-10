import React from 'react';
import { Button } from './ui/Button';
import { FadeIn } from './ui/FadeIn';
import { LetterStagger } from './ui/LetterStagger';

export const Hero: React.FC = () => {
  return (
    <section className="relative flex items-center justify-center pt-32 pb-10 overflow-hidden">
      
      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
        {/* Badge */}
        <FadeIn delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-900/10 backdrop-blur-md mb-10 shadow-[0_0_15px_rgba(168,85,247,0.15)] group hover:border-purple-400/50 transition-all cursor-default">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-purple-100 uppercase drop-shadow-sm">Formación exclusiva para editores</span>
          </div>
        </FadeIn>

        {/* Headline with Letter Stagger & Shimmer */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]">
            {/* "Conviértete en el" using the shared component */}
            <div className="block mb-4 text-glow-white">
              <LetterStagger text="Conviértete en el" delayBase={200} />
            </div>
            
            {/* "Top 1% de Editores" wrapped in FadeIn for consistent entrance */}
            <FadeIn delay={500}>
              <div className="block transform hover:scale-[1.02] transition-transform duration-500">
                <span className="text-shimmer inline-block">
                   Top 1% de Editores
                </span>
              </div>
            </FadeIn>
          </h1>
        </div>

        {/* Subheadline - Updated Text */}
        <FadeIn delay={800}>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            El conocimiento exacto para trabajar con <span className="text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">Figuras Top Mundial</span> y posicionarte como un <span className="text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">Editor Reconocido</span>.
          </p>
        </FadeIn>

        {/* CTA Button */}
        <FadeIn delay={1000}>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto justify-center">
              {/* Primary Button: Entrar a la formación */}
              <a href="https://e08ff1-xx.myshopify.com/products/formacion-1-a-1" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                <Button className="w-full md:w-auto text-lg px-12 py-5 shadow-[0_0_40px_-5px_rgba(147,51,234,0.3)] transform hover:scale-105 transition-all duration-300 border border-white/10">
                  ENTRAR A LA FORMACION
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium tracking-wide opacity-60">
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
              <span>PLAZAS LIMITADAS DISPONIBLES</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};