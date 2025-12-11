import React from 'react';
import { FadeIn } from './ui/FadeIn';

const DiscordLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 127.14 96.36" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.89,105.89,0,0,0,126.6,80.22c1.24-23.28-13.26-47.57-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

export const CommunityView: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-20 relative overflow-hidden perspective-1000">
      <style>
        {`
          .perspective-1000 { perspective: 1000px; }
          
          @keyframes float-complex {
            0%, 100% { transform: translateY(0) rotateX(0) rotateY(0) scale(1); filter: drop-shadow(0 0 30px rgba(88,101,242,0.3)); }
            25% { transform: translateY(-15px) rotateX(5deg) rotateY(2deg) scale(1.02); filter: drop-shadow(0 0 50px rgba(88,101,242,0.5)); }
            50% { transform: translateY(5px) rotateX(-2deg) rotateY(-2deg) scale(0.98); filter: drop-shadow(0 0 30px rgba(88,101,242,0.3)); }
            75% { transform: translateY(-10px) rotateX(2deg) rotateY(-5deg) scale(1.01); filter: drop-shadow(0 0 60px rgba(88,101,242,0.6)); }
          }

          @keyframes glass-shine {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }

          .animate-float-complex {
            animation: float-complex 8s ease-in-out infinite;
          }

          .text-liquid-glass {
            background: linear-gradient(
              110deg,
              #5865F2 20%,
              #ffffff 50%,
              #5865F2 80%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: glass-shine 5s linear infinite;
          }
        `}
      </style>

      <div className="container mx-auto px-4 text-center z-10 flex flex-col items-center">
        
        <div className="mb-24 relative">
            {/* Background ambient glow for text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#5865F2]/20 blur-[100px] rounded-full pointer-events-none" />

            <h1 className="flex flex-col items-center gap-2">
                {/* Top Text - Clean & Elegant */}
                <FadeIn delay={100}>
                    <div className="animate-float-complex" style={{ animationDelay: '0s' }}>
                      <span className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.2em] text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] uppercase backdrop-blur-sm">
                        Comunidad de
                      </span>
                    </div>
                </FadeIn>
                
                {/* Main Text - Exaggerated Glass/Liquid Effect */}
                <FadeIn delay={300}>
                    <div className="animate-float-complex" style={{ animationDelay: '-4s' }}>
                      <span className="block text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tighter text-liquid-glass drop-shadow-[0_0_50px_rgba(88,101,242,0.8)] relative z-10 leading-[1.1]">
                         DISCORD
                      </span>
                    </div>
                </FadeIn>
            </h1>
        </div>

        <FadeIn delay={500} className="w-full flex justify-center">
            <a href="https://discord.gg/zEcFPBqy6s" target="_blank" rel="noopener noreferrer" className="relative group">
                <div className="absolute inset-0 bg-[#5865F2] rounded-3xl blur-[40px] opacity-40 group-hover:opacity-70 group-hover:blur-[60px] transition-all duration-500 animate-pulse"></div>
                
                <button className="relative px-16 py-8 md:px-24 md:py-10 bg-[#5865F2] hover:bg-[#4752c4] rounded-3xl flex items-center gap-8 transition-all duration-500 transform hover:scale-[1.02] border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden">
                    
                    <DiscordLogo className="w-16 h-16 md:w-24 md:h-24 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                    
                    <div className="flex flex-col items-start">
                      <span className="text-3xl md:text-5xl font-black text-white tracking-wide drop-shadow-md">
                          ENTRAR
                      </span>
                      <span className="text-white/60 text-sm md:text-lg font-medium tracking-widest uppercase">
                        Acceso Exclusivo
                      </span>
                    </div>
                    
                    {/* Glass Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                </button>
            </a>
        </FadeIn>

      </div>
    </section>
  );
};