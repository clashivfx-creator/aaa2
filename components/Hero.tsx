
import React from 'react';
import { Button } from './ui/Button';
import { FadeIn } from './ui/FadeIn';
import { LetterStagger } from './ui/LetterStagger';
import { GlassCard } from './ui/GlassCard';
import { Sparkles, ShoppingCart } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative flex items-center justify-center pt-32 pb-16 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-20">
          
          {/* Left Column: Main Headline & Intro */}
          <div className="flex-1 text-center lg:text-left">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-900/10 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(168,85,247,0.15)] group hover:border-purple-400/50 transition-all cursor-default lg:mx-0 mx-auto">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
                </span>
                <span className="text-xs font-bold tracking-widest text-purple-100 uppercase drop-shadow-sm">Formación exclusiva para editores</span>
              </div>
            </FadeIn>

            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.85] flex flex-col items-center lg:items-start">
                <div className="block text-glow-white text-left w-full lg:w-auto">
                  <LetterStagger text="Conviértete" delayBase={200} align="left" />
                </div>
                
                <div className="block mb-2 text-glow-white text-left w-full lg:w-auto opacity-80">
                  <LetterStagger text="en el" delayBase={450} align="left" />
                </div>
                
                <FadeIn delay={700} className="w-full lg:w-auto text-left">
                  <div className="block transform hover:scale-[1.01] transition-transform duration-500 relative inline-block">
                    <span className="absolute inset-0 text-shimmer blur-lg opacity-40 select-none z-0" aria-hidden="true">
                      Top 1% de Editores
                    </span>
                    <span className="relative z-10 inline-block text-shimmer">
                      Top 1% de Editores
                    </span>
                  </div>
                </FadeIn>
              </h1>
            </div>

            <FadeIn delay={900}>
              <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl lg:mx-0 mx-auto leading-relaxed font-light">
                El conocimiento exacto para trabajar con <span className="text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">Figuras Top Mundial</span> y posicionarte como un <span className="text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">Editor Reconocido</span>.
              </p>
            </FadeIn>

            <FadeIn delay={1100}>
              <div className="flex flex-col lg:items-start items-center gap-6">
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center lg:justify-start">
                  <a href="https://e08ff1-xx.myshopify.com/products/formacion-1-a-1" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto relative group">
                    <div className="absolute -inset-1 rounded-full blur-xl opacity-60 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 transition-opacity duration-500 group-hover:opacity-80"></div>
                    <Button className="relative z-10 w-full md:w-auto text-sm md:text-xl px-6 py-3 md:px-10 md:py-5 border border-white/10 animate-pulse-glow">
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

          {/* Right Column: VFX Pack Promo Card with Rainbow Glow & Autoplay Video */}
          <FadeIn delay={1300} className="w-full max-w-sm lg:max-w-md shrink-0">
            <div className="relative p-[2px] rounded-3xl overflow-hidden group shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_70px_-10px_rgba(168,85,247,0.4)] transition-all duration-500">
              {/* This is the rainbow glowing border background */}
              <div className="absolute inset-0 rainbow-card-border opacity-70 group-hover:opacity-100 transition-opacity blur-[2px]" />
              
              <GlassCard className="!bg-[#070708] !border-none !rounded-[22px] p-6 md:p-8 relative z-10 h-full flex flex-col">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                    <span className="text-[14px] md:text-[16px] font-black tracking-[0.25em] text-yellow-400 uppercase animate-flash-glow">Oferta Exclusiva</span>
                  </div>
                  <h3 className="text-3xl font-extrabold tracking-tight text-white mb-0 leading-none">
                    PACK AVANZADO <span className="text-gradient">VFX</span>
                  </h3>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-2">
                    EFECTOS CON 1 CLIC
                  </p>
                </div>

                {/* YouTube Shorts Embed - Updated for Autoplay, Muted, Loop */}
                <div className="relative aspect-[9/16] w-full bg-black rounded-xl overflow-hidden border border-white/5 shadow-2xl group-hover:border-white/20 transition-all">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/aZVKFvUX1ns?autoplay=1&mute=1&loop=1&playlist=aZVKFvUX1ns&controls=0&modestbranding=1&rel=0&showinfo=0"
                    title="VFX Pack Preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full object-cover pointer-events-none"
                  ></iframe>
                  
                  {/* Overlay gradient for depth */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>

                <div className="mt-6">
                  <a 
                    href="https://e08ff1-xx.myshopify.com/products/pack-de-efectos-esenciales" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <button className="w-full flex items-center justify-center gap-3 px-6 py-5 rounded-xl text-white font-black text-sm md:text-base uppercase tracking-tighter rainbow-btn shadow-lg group/btn">
                      <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                      CONSEGUIR AHORA
                    </button>
                  </a>
                  <p className="text-[10px] text-center text-gray-500 mt-4 font-medium uppercase tracking-widest">
                    Acceso instantáneo • Plugins incluidos
                  </p>
                </div>
              </GlassCard>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};
