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
            
            {/* CARD 1: Feedback Directo - Blue Style */}
            <FadeIn delay={0} className="h-full">
              <GlassCard hoverEffect className="flex flex-col items-center text-center py-8 px-6 h-full group border-blue-500/30 bg-gradient-to-b from-blue-900/10 via-white/5 to-transparent shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]">
                  <div className="mb-6 relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-xl bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
                    <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-500/40 transition-all duration-500 ease-out shadow-[inset_0_0_15px_rgba(59,130,246,0.1)]">
                       <Target className="w-7 h-7 text-blue-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-blue-100 group-hover:text-white transition-colors">Feedback Directo</h3>
                  <p className="text-blue-200/60 text-sm leading-relaxed group-hover:text-blue-200/80 transition-colors">Revisiones 1 a 1 de tus timelines para pulir esos detalles que marcan la diferencia.</p>
              </GlassCard>
            </FadeIn>

            {/* CARD 2: Llamadas Grupales - Purple Style */}
            <FadeIn delay={50} className="h-full">
              <GlassCard hoverEffect className="flex flex-col items-center text-center py-8 px-6 h-full group border-purple-500/30 bg-gradient-to-b from-purple-900/10 via-white/5 to-transparent shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)]">
                  <div className="mb-6 relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-xl bg-purple-500/10 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
                    <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 flex items-center justify-center group-hover:scale-110 group-hover:border-purple-500/40 transition-all duration-500 ease-out shadow-[inset_0_0_15px_rgba(168,85,247,0.1)]">
                       <Video className="w-7 h-7 text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-purple-100 group-hover:text-white transition-colors">Llamadas Grupales</h3>
                  <p className="text-purple-200/60 text-sm leading-relaxed group-hover:text-purple-200/80 transition-colors">Sesiones semanales en vivo. Q&A, networking y análisis de proyectos reales.</p>
              </GlassCard>
            </FadeIn>

            {/* CARD 3: Comunidad VIP - Orange Style */}
            <FadeIn delay={100} className="h-full">
              <GlassCard hoverEffect className="flex flex-col items-center text-center py-8 px-6 h-full group border-orange-500/30 bg-gradient-to-b from-orange-900/10 via-white/5 to-transparent shadow-[0_0_30px_-5px_rgba(249,115,60,0.15)]">
                  <div className="mb-6 relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-xl bg-orange-500/10 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
                    <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 flex items-center justify-center group-hover:scale-110 group-hover:border-orange-500/40 transition-all duration-500 ease-out shadow-[inset_0_0_15px_rgba(249,115,60,0.1)]">
                       <UsersRound className="w-7 h-7 text-orange-300 drop-shadow-[0_0_8px_rgba(249,115,60,0.5)]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-orange-100 group-hover:text-white transition-colors">Comunidad VIP</h3>
                  <p className="text-orange-200/60 text-sm leading-relaxed group-hover:text-orange-200/80 transition-colors">Acceso exclusivo a un Discord privado con recursos, presets y ofertas laborales.</p>
              </GlassCard>
            </FadeIn>

            {/* CARD 4: Software y Presets - Emerald Style */}
            <FadeIn delay={150} className="h-full">
              <GlassCard hoverEffect className="flex flex-col items-center text-center py-8 px-6 h-full group border-emerald-500/30 bg-gradient-to-b from-emerald-900/10 via-white/5 to-transparent shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)]">
                  <div className="mb-6 relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-xl bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
                    <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-500/40 transition-all duration-500 ease-out shadow-[inset_0_0_15px_rgba(16,185,129,0.1)]">
                       <Package className="w-7 h-7 text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-emerald-100 group-hover:text-white transition-colors">Software y Presets</h3>
                  <p className="text-emerald-200/60 text-sm leading-relaxed group-hover:text-emerald-200/80 transition-colors">Incluye programas, plugins profesionales exclusivos y presets listos para usar.</p>
              </GlassCard>
            </FadeIn>
        </div>
      </div>
    </section>
  );
};