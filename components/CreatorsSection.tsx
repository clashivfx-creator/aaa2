import React from 'react';
import { TrendingUp } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { FadeIn } from './ui/FadeIn';

export const CreatorsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
              Creadores de <span className="text-gradient">Éxito</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Personas influyentes que han transformado su presencia digital.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 justify-center">
          <FadeIn delay={100}>
            <GlassCard className="relative overflow-hidden border-purple-500/20 max-w-4xl mx-auto">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                
                {/* Video Embed Container (Vertical for Shorts) */}
                <div className="shrink-0 w-full md:w-auto flex justify-center">
                  <div className="relative w-[260px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
                    {/* Glowing effect behind video */}
                    <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500 to-pink-500 opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500"></div>
                    
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/2ZIbooV2QMo"
                      title="Daniz - YouTube Short"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="relative z-10 w-full h-full"
                    ></iframe>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left py-2">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                      <h3 className="text-3xl font-bold text-white">Daniz</h3>
                      <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Éxito
                      </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed font-light text-lg">
                    Dueño de una de las marcas de ropa más grandes de España. Un referente indiscutible en emprendimiento y creación de marca personal.
                  </p>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};