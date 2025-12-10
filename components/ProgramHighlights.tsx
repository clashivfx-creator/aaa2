import React from 'react';
import { Video, Target, UsersRound, Package } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { FadeIn } from './ui/FadeIn';

export const ProgramHighlights: React.FC = () => {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                Esto no es un curso cualquiera
              </h2>
            </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <FadeIn delay={100} className="h-full">
              <GlassCard hoverEffect className="flex flex-col items-center text-center py-8 px-6 h-full group">
                  <div className="mb-6 relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-xl bg-white/5 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse" />
                    <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-500 ease-out shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                       <Target className="w-7 h-7 icon-rainbow-neon" style={{ animationDelay: '0s' }} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-100 transition-colors">Feedback Directo</h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">Revisiones 1 a 1 de tus timelines para pulir esos detalles que marcan la diferencia.</p>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={200} className="h-full">
              <GlassCard hoverEffect className="flex flex-col items-center text-center py-8 px-6 border-purple-500/20 bg-gradient-to-b from-white/5 to-transparent h-full group">
                  <div className="mb-6 relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-xl bg-white/5 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse" />
                    <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-500 ease-out shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                       <Video className="w-7 h-7 icon-rainbow-neon" style={{ animationDelay: '0.5s' }} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-pink-100 transition-colors">Llamadas Grupales</h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">Sesiones semanales en vivo. Q&A, networking y análisis de proyectos reales.</p>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={300} className="h-full">
              <GlassCard hoverEffect className="flex flex-col items-center text-center py-8 px-6 h-full group">
                  <div className="mb-6 relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-xl bg-white/5 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse" />
                    <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-500 ease-out shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                       <UsersRound className="w-7 h-7 icon-rainbow-neon" style={{ animationDelay: '1s' }} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-orange-100 transition-colors">Comunidad VIP</h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">Acceso exclusivo a un Discord privado con recursos, presets y ofertas laborales.</p>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={400} className="h-full">
              <GlassCard hoverEffect className="flex flex-col items-center text-center py-8 px-6 h-full group">
                  <div className="mb-6 relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-xl bg-white/5 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse" />
                    <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-500 ease-out shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                       <Package className="w-7 h-7 icon-rainbow-neon" style={{ animationDelay: '1.5s' }} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-100 transition-colors">Software y Presets</h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">Incluye programas, plugins profesionales exclusivos y presets listos para usar.</p>
              </GlassCard>
            </FadeIn>
        </div>
      </div>
    </section>
  );
};