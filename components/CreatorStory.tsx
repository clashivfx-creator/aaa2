import React from 'react';
import { Button } from './ui/Button';
import { FadeIn } from './ui/FadeIn';

export const CreatorStory: React.FC = () => {
  return (
    <section className="py-16 px-4 relative">
      <div className="container mx-auto max-w-4xl text-center">
        
        <div className="flex flex-col items-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-glow-white">
              De editar gratis a trabajar con <span className="text-gradient drop-shadow-md">los mejores</span>
            </h2>
          </FadeIn>
          
          <div className="space-y-6 mb-8 max-w-3xl mx-auto">
            <FadeIn delay={50}>
              <div className="glass-panel rounded-2xl p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden group hover:bg-white/5 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-orange-500/5 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-gray-300 text-xl md:text-2xl leading-relaxed font-light relative z-10">
                  Antes cobraba <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 font-bold text-2xl md:text-3xl drop-shadow-sm">$200</span> por mes editando muchos videos que no me pagaban lo suficiente. Ahora, con solo 1 o 2 proyectos al mes, estoy cobrando más de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500 font-bold text-2xl md:text-3xl drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">$3,000</span>, hasta <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500 font-bold text-2xl md:text-3xl drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">$5,000</span> si el proyecto lo amerita.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="text-xl text-gray-400 font-light mt-8">
                Hoy, he trabajado con 
                <span className="block mt-4 text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(234,179,8,0.6)] leading-relaxed filter">
                  Rauw Alejandro, Emilia Mernes, Duki, Khea, Kun Agüero, YSY A, Thiago PZK, Lit Killah, y muchos más.
                </span>
              </p>
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