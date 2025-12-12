import React from 'react';
import { FadeIn } from './ui/FadeIn';

const DiscordLogoBig = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
  </svg>
);

export const DiscordLanding: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      
      {/* Estilo local para las animaciones */}
      <style>{`
        @keyframes float-text {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes discord-color-cycle {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-float-text {
          animation: float-text 6s ease-in-out infinite;
        }

        .discord-gradient-text {
          background: linear-gradient(
            90deg, 
            #5865F2 0%, 
            #7289da 25%, 
            #ffffff 50%, 
            #7289da 75%, 
            #5865F2 100%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: discord-color-cycle 4s ease-in-out infinite;
        }
      `}</style>

      {/* Background Glows specific to Discord Theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5865F2] opacity-20 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <FadeIn delay={100}>
          <div className="mb-10 animate-float-text">
            <h2 className="text-4xl md:text-6xl font-light text-gray-400 tracking-widest uppercase mb-4 drop-shadow-lg">
              Comunidad de
            </h2>
            <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter discord-gradient-text drop-shadow-[0_0_40px_rgba(88,101,242,0.5)] leading-none">
              DISCORD
            </h1>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mt-16">
            <a 
              href="https://discord.com/invite/zEcFPBqy6s" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center group"
            >
              <button className="px-24 py-10 bg-[#5865F2] hover:bg-[#4752C4] rounded-3xl text-white text-4xl font-bold tracking-wider shadow-[0_0_60px_rgba(88,101,242,0.5)] hover:shadow-[0_0_100px_rgba(88,101,242,0.8)] hover:scale-105 transition-all duration-300 flex items-center gap-6 border-2 border-[#5865F2]/50 hover:border-white/30">
                <DiscordLogoBig className="w-14 h-14" />
                ENTRAR
              </button>
              <span className="mt-6 text-[#5865F2] text-lg font-medium tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                ACCESO EXCLUSIVO
              </span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};