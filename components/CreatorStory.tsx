import React from 'react';
import { Button } from './ui/Button';
import { FadeIn } from './ui/FadeIn';
import { GlassCard } from './ui/GlassCard';

export const CreatorStory: React.FC = () => {
  return (
    <section className="py-16 px-4 relative">
      <div className="container mx-auto max-w-4xl text-center">
        
        <div className="flex flex-col items-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight text-glow-white">
              De editar gratis a trabajar con <span className="text-gradient drop-shadow-md">los mejores</span>
            </h2>
          </FadeIn>
          
          <div className="space-y-8 text-gray-300 text-xl leading-relaxed mb-10 font-light max-w-3xl mx-auto">
            <FadeIn delay={50}>
               {/* Liquid Glass Box */}
              <GlassCard className="!bg-white/5 !border-white/10 relative overflow-hidden group hover:!bg-white/10 transition-all duration-500 !p-8 shadow-[0_0_40px_-10px_rgba(168,85,247,0.15)]">
                  {/* Fluid background effect */}
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-500/10 via-transparent to-pink-500/10 opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-700"></div>
                  
                  <p className="relative z-10 text-lg md:text-xl">
                    Antes cobraba <span className="text-red-500 font-bold text-glow-red">$200</span> dólares por mes editando muchos videos que no me pagaban lo suficiente. Ahora, con solo 1 o 2 proyectos al mes, estoy cobrando más de <span className="text-emerald-400 font-bold text-glow-green">$3,000</span>, hasta <span className="text-yellow-400 font-bold text-glow-gold">$5,000</span> si el proyecto lo amerita.
                  </p>
              </GlassCard>
            </FadeIn>
            
            <FadeIn delay={100}>
              <div className="px-4 mt-8">
                <p className="mb-3 text-gray-400 text-lg">Hoy, he trabajado con:</p>
                <strong className="text-artist-highlight font-bold text-2xl md:text-3xl block leading-tight pb-2">
                  Rauw Alejandro, Emilia Mernes, Duki, Khea, Kun Agüero, YSY A, Thiago PZK, Lit Killah, y muchos más.
                </strong>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="mt-8 p-4 bg-purple-900/20 border border-purple-500/30 rounded-2xl backdrop-blur-sm inline-block shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)]">
                <p className="text-purple-200 italic text-xl font-medium">
                  "Trabajando con los mejores de la industria."
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
               <div className="flex justify-center pt-2">
                 <a href="https://youtube.com/playlist?list=PLE3AyUAb-9ISDioqD_EtlENDrS_1es4oU&si=O8zivdSLdxkoCN4M&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnvarhxRuQ8ZJvP0IhOAkyW4yOqEuoB4AbGjBOwB_ML6LmwbO7sB5OwSqaq1o_aem_qa2m332gdZPWvmEWqbJQXw" target="_blank" rel="noopener noreferrer">
                   <Button className="text-lg px-8 py-4 !bg-none !bg-red-600 hover:!bg-red-500 shadow-[0_0_40px_-5px_rgba(220,38,38,0.4)] transform hover:scale-105 transition-all duration-300 border border-white/10">
                     MIRA MIS TRABAJOS
                   </Button>
                 </a>
               </div>
            </FadeIn>
          </div>

          <FadeIn delay={250}>
            <a href="https://e08ff1-xx.myshopify.com/" target="_blank" rel="noopener noreferrer">
              <Button className="!px-14 !py-6 !text-2xl !font-bold !bg-none !bg-green-500 hover:!bg-green-400 !text-white !border-none shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:shadow-[0_0_60px_rgba(34,197,94,0.8)] transform hover:scale-105 transition-all duration-300">
                  Toda la tienda
              </Button>
            </a>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};