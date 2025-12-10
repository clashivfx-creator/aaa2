import React from 'react';
import { 
  Zap, 
  Layers, 
  Users, 
  Palette, 
  Workflow, 
  MessageSquare 
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { FadeIn } from './ui/FadeIn';

// Modified data structure: Storing the Component reference instead of the Element
// to allow passing custom classes dynamically in the render loop.
const features = [
  {
    Icon: Zap,
    title: "Edición Profesional",
    desc: "VFX y ediciones profesionales."
  },
  {
    Icon: Layers,
    title: "Composición Pro",
    desc: "Integración 3D/2D con acabado cinematográfico."
  },
  {
    Icon: Users,
    title: "Comunidad Activa",
    desc: "Networking con editores que lideran el mercado."
  },
  {
    Icon: Palette,
    title: "Color Grading",
    desc: "Logra acabados cinematográficos de estándar industrial."
  },
  {
    Icon: Workflow,
    title: "Inteligencia Artificial",
    desc: "Videos con IA ultra realistas de calidad cine."
  },
  {
    Icon: MessageSquare,
    title: "Feedback Personalizado",
    desc: "Correcciones directas sobre tus timelines."
  }
];

export const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-32 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-24 flex flex-col items-center">
          {/* 
             HEADLINE STYLE UPDATE:
             - Changed class to 'text-gradient-yellow' for the requested gold/yellow gradient look.
             - Maintained FadeIn for smooth entry.
          */}
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-gradient-yellow inline-block">
                INCLUYE:
              </span>
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 100 + 1000}>
              <GlassCard variant="glow-border" className="h-full group hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
                <div className="mb-6 relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-xl bg-white/5 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse" />
                  <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-500 ease-out shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                     <feature.Icon 
                       className="w-7 h-7 icon-rainbow-neon" 
                       style={{ animationDelay: `${index * 0.5}s` }} 
                     />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-purple-100 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                  {feature.desc}
                </p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};