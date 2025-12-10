import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  TriangleAlert, 
  Zap, 
  Layers, 
  Users, 
  Palette, 
  Workflow, 
  MessageSquare, 
  Video, 
  Target, 
  UsersRound, 
  Package 
} from 'lucide-react';

/* 
  =============================================================================
  GLOBAL STYLES (Formerly in index.html)
  =============================================================================
*/
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=SF+Pro+Display:wght@300;400;500;600;700&display=swap');

  :root {
    --font-sans: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  body {
    font-family: var(--font-sans);
    background-color: #000000;
    color: #ffffff;
    overflow-x: hidden;
  }

  /* Custom Selection */
  ::selection {
    background: rgba(168, 85, 247, 0.3);
    color: #ffffff;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #000000; 
  }
  ::-webkit-scrollbar-thumb {
    background: #1a1a1a; 
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #333333; 
  }

  .glass-panel {
    background: rgba(20, 20, 23, 0.4);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }

  /* Premium Text Shimmer Effect - Rainbow Gradient */
  .text-shimmer {
    background: linear-gradient(
      120deg,
      #a855f7 0%,   /* Purple-500 */
      #ec4899 20%,  /* Pink-500 */
      #3b82f6 40%,  /* Blue-500 */
      #10b981 60%,  /* Emerald-500 */
      #f59e0b 80%,  /* Amber-500 */
      #a855f7 100%  /* Purple-500 Loop */
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: textShine 6s linear infinite;
    filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.3));
  }

  /* Gold Shine Effect (White -> Gold -> White) */
  .text-gold-shine {
    background: linear-gradient(
      110deg,
      #ffffff 0%,
      #e2e8f0 30%,  /* Slate-200 */
      #fbbf24 45%,  /* Amber-400 (Gold) */
      #f59e0b 55%,  /* Amber-500 */
      #e2e8f0 70%,  /* Slate-200 */
      #ffffff 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: textShine 4s linear infinite;
    filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.25));
  }
  
  /* --- NEW: Yellow/Amber Gradient --- */
  .text-gradient-yellow {
    background: linear-gradient(
      120deg,
      #fef08a 0%,   /* Yellow-200 */
      #facc15 20%,  /* Yellow-400 */
      #eab308 40%,  /* Yellow-500 */
      #ca8a04 60%,  /* Yellow-600 */
      #facc15 80%,  /* Yellow-400 */
      #fef08a 100%  /* Yellow-200 */
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: textShine 6s linear infinite;
    filter: drop-shadow(0 0 10px rgba(234, 179, 8, 0.3));
  }

  /* Standard Text Gradient for other elements */
  .text-gradient {
    background: linear-gradient(to right, #c084fc, #f472b6, #fb923c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @keyframes textShine {
    to { background-position: 200% center; }
  }

  /* Button Sheen Animation */
  @keyframes sheen {
    0% { transform: skewX(-45deg) translateX(-150%); }
    20% { transform: skewX(-45deg) translateX(150%); }
    100% { transform: skewX(-45deg) translateX(150%); }
  }
  .animate-sheen {
    animation: sheen 4s infinite;
  }

  /* Text Glows */
  .text-glow-white { text-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 10px rgba(255, 255, 255, 0.1); }
  .text-glow-gold { text-shadow: 0 0 20px rgba(234, 179, 8, 0.3); }
  .text-glow-red { text-shadow: 0 0 15px rgba(239, 68, 68, 0.6); }
  .text-glow-green { text-shadow: 0 0 20px rgba(52, 211, 153, 0.5); }

  /* Alert Breathing Animation */
  @keyframes alert-breathe {
    0%, 100% { box-shadow: 0 0 0 rgba(249, 115, 60, 0); border-color: rgba(249, 115, 60, 0.2); }
    50% { box-shadow: 0 0 25px rgba(249, 115, 60, 0.3); border-color: rgba(249, 115, 60, 0.8); }
  }
  .animate-alert-breathe {
    animation: alert-breathe 3s ease-in-out infinite;
  }

  /* Background Blob Animation */
  @keyframes blob-float {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob-float 15s infinite ease-in-out;
  }
  .animation-delay-2000 { animation-delay: 2s; }
  .animation-delay-4000 { animation-delay: 4s; }

  /* Reveal Animations */
  .reveal-hidden { opacity: 0; transform: translateY(20px); filter: blur(12px); }
  .reveal-visible { opacity: 1; transform: translateY(0); filter: blur(0); transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1); }

  /* Border Shimmer */
  @keyframes border-shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-border-glow {
    background-size: 200% 200%;
    animation: border-shimmer 4s ease infinite;
  }

  /* --- NEW: RAINBOW NEON ICON ANIMATION --- */
  @keyframes rainbow-neon {
    0% {
      color: #a855f7; /* Purple-500 */
      filter: drop-shadow(0 0 5px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 10px rgba(168, 85, 247, 0.4));
    }
    20% {
      color: #ec4899; /* Pink-500 */
      filter: drop-shadow(0 0 5px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 10px rgba(236, 72, 153, 0.4));
    }
    40% {
      color: #3b82f6; /* Blue-500 */
      filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 10px rgba(59, 130, 246, 0.4));
    }
    60% {
      color: #10b981; /* Emerald-500 */
      filter: drop-shadow(0 0 5px rgba(16, 185, 129, 0.8)) drop-shadow(0 0 10px rgba(16, 185, 129, 0.4));
    }
    80% {
      color: #f59e0b; /* Amber-500 */
      filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.8)) drop-shadow(0 0 10px rgba(245, 158, 11, 0.4));
    }
    100% {
      color: #a855f7; /* Purple-500 */
      filter: drop-shadow(0 0 5px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 10px rgba(168, 85, 247, 0.4));
    }
  }

  .icon-rainbow-neon {
    animation: rainbow-neon 6s linear infinite;
  }
`;

/* 
  =============================================================================
  HELPER COMPONENTS
  =============================================================================
*/

// --- FadeIn ---
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}
const FadeIn: React.FC<FadeInProps> = ({ children, className = "", delay = 0, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [threshold]);

  return (
    <div ref={ref} className={`reveal-hidden ${isVisible ? 'reveal-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// --- LetterStagger ---
interface LetterStaggerProps {
  text: string;
  className?: string;
  delayBase?: number;
  staggerTime?: number;
}
const LetterStagger: React.FC<LetterStaggerProps> = ({ text, className = "", delayBase = 0, staggerTime = 30 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => { if (elementRef.current) observer.unobserve(elementRef.current); };
  }, []);

  let charCount = 0;
  return (
    <span ref={elementRef} className={`inline-flex flex-wrap justify-center gap-[0.25em] ${className}`}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => {
            const currentDelay = delayBase + (charCount * staggerTime);
            charCount++;
            return (
              <span key={charIndex} className={`inline-block reveal-hidden ${isVisible ? 'reveal-visible' : ''}`} style={{ transitionDelay: `${currentDelay}ms` }}>
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

// --- GlassCard ---
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glow-border' | 'feature';
  hoverEffect?: boolean;
}
const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', variant = 'default', hoverEffect = false }) => {
  if (variant === 'glow-border') {
    return (
      <div className={`relative p-[1px] rounded-2xl overflow-hidden group ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-border-glow" />
        <div className="absolute inset-[1px] bg-[#0a0a0c] rounded-2xl z-0" />
        <div className="relative z-10 h-full bg-white/5 backdrop-blur-xl rounded-2xl p-6 transition-all duration-300">
           {children}
        </div>
      </div>
    );
  }
  return (
    <div className={`glass-panel rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${hoverEffect ? 'hover:bg-white/10 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.15)] group hover:-translate-y-1' : ''} ${className}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
      {children}
    </div>
  );
};

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}
const Button: React.FC<ButtonProps> = ({ children, fullWidth = false, className = '', ...props }) => {
  return (
    <button className={`group relative px-8 py-4 rounded-full font-bold text-white overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300 ${fullWidth ? 'w-full' : 'w-auto'} ${className}`} {...props}>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 left-0 w-20 h-full bg-white/30 blur-xl transform -skew-x-12 animate-sheen"></div>
      </div>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </span>
    </button>
  );
};

// --- ScrollProgress ---
const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(Number(totalScroll / windowHeight));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100] bg-white/5">
      <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(236,72,153,0.5)]" style={{ width: `${scrollProgress * 100}%` }} />
    </div>
  );
};

// --- AnimatedBackground ---
const AnimatedBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => setMousePosition({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-[#000000]">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#08080a] to-[#020203]" />
      <div className="absolute -top-[20%] left-[20%] w-[80vw] h-[80vw] bg-indigo-950/30 rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-blob" />
      <div className="absolute top-[10%] -right-[20%] w-[60vw] h-[60vw] bg-slate-900/40 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[70vw] h-[70vw] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-blob animation-delay-4000" />
      <div className="absolute transition-transform duration-500 ease-out will-change-transform"
        style={{ left: 0, top: 0, width: '1200px', height: '1200px', transform: `translate(${mousePosition.x - 600}px, ${mousePosition.y - 600}px)`, background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 60%)', filter: 'blur(60px)' }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 120%)' }} />
    </div>
  );
};

/* 
  =============================================================================
  SECTIONS
  =============================================================================
*/

const Hero: React.FC = () => (
  <section className="relative flex items-center justify-center pt-32 pb-10 overflow-hidden">
    <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
      <FadeIn delay={0}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-900/10 backdrop-blur-md mb-10 shadow-[0_0_15px_rgba(168,85,247,0.15)] group hover:border-purple-400/50 transition-all cursor-default">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
          </span>
          <span className="text-xs font-bold tracking-widest text-purple-100 uppercase drop-shadow-sm">Formación exclusiva para editores</span>
        </div>
      </FadeIn>
      <div className="mb-8">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]">
          <div className="block mb-4 text-glow-white"><LetterStagger text="Conviértete en el" delayBase={200} /></div>
          <FadeIn delay={500}>
            <div className="block transform hover:scale-[1.02] transition-transform duration-500">
              <span className="text-shimmer inline-block">Top 1% de Editores</span>
            </div>
          </FadeIn>
        </h1>
      </div>
      <FadeIn delay={800}>
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          El conocimiento exacto para trabajar con <span className="text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">Figuras Top Mundial</span> y posicionarte como un <span className="text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]">Editor Reconocido</span>.
        </p>
      </FadeIn>
      <FadeIn delay={1000}>
        <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto justify-center">
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

const WarningSection: React.FC = () => (
  <section className="pt-4 pb-20 px-4 relative flex justify-center">
    <div className="container max-w-3xl">
      <FadeIn>
        <GlassCard className="!bg-black/40 !backdrop-blur-3xl animate-alert-breathe">
            <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                 <div className="absolute inset-0 bg-orange-500 rounded-full opacity-20 animate-ping"></div>
                 <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-orange-500/20 to-transparent flex items-center justify-center border border-orange-500/40">
                    <TriangleAlert className="w-8 h-8 text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]" />
                 </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-orange-100 mb-2 tracking-tight drop-shadow-md">NO es para principiantes</h3>
                <p className="text-gray-400 leading-relaxed font-light text-base">
                  Este programa requiere minimos conocimientos previos de <span className="text-gray-200 font-medium border-b border-orange-500/30">After Effects & Premiere</span>. 
                  Si buscas aprender desde cero, este no es el lugar.
                </p>
              </div>
            </div>
        </GlassCard>
      </FadeIn>
    </div>
  </section>
);

const FeaturesGrid: React.FC = () => {
  const features = [
    { Icon: Zap, title: "Edición Profesional", desc: "VFX y ediciones profesionales." },
    { Icon: Layers, title: "Composición Pro", desc: "Integración 3D/2D con acabado cinematográfico." },
    { Icon: Users, title: "Comunidad Activa", desc: "Networking con editores que lideran el mercado." },
    { Icon: Palette, title: "Color Grading", desc: "Logra acabados cinematográficos de estándar industrial." },
    { Icon: Workflow, title: "Inteligencia Artificial", desc: "Videos con IA ultra realistas de calidad cine." },
    { Icon: MessageSquare, title: "Feedback Personalizado", desc: "Correcciones directas sobre tus timelines." }
  ];
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
                     <feature.Icon className="w-7 h-7 icon-rainbow-neon" style={{ animationDelay: `${index * 0.5}s` }} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-purple-100 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light group-hover:text-gray-300 transition-colors">{feature.desc}</p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProgramHighlights: React.FC = () => (
  <section className="py-32 px-4 relative overflow-hidden">
    <div className="container mx-auto max-w-7xl relative z-10">
      <div className="text-center mb-20">
          <FadeIn><h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Esto no es un curso cualquiera</h2></FadeIn>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 - Target */}
          <FadeIn delay={100} className="h-full">
            <GlassCard hoverEffect className="flex flex-col items-center text-center py-12 px-6 h-full group">
                <div className="mb-8 relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-xl bg-white/5 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse" />
                  <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-500 ease-out shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                     <Target className="w-7 h-7 icon-rainbow-neon" style={{ animationDelay: '0s' }} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-purple-100 transition-colors">Feedback Directo</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">Revisiones 1 a 1 de tus timelines para pulir esos detalles que marcan la diferencia.</p>
            </GlassCard>
          </FadeIn>

          {/* Card 2 - Video */}
          <FadeIn delay={200} className="h-full">
            <GlassCard hoverEffect className="flex flex-col items-center text-center py-12 px-6 border-purple-500/20 bg-gradient-to-b from-white/5 to-transparent h-full group">
                <div className="mb-8 relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-xl bg-white/5 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse" />
                  <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-500 ease-out shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                     <Video className="w-7 h-7 icon-rainbow-neon" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-pink-100 transition-colors">Llamadas Grupales</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">Sesiones semanales en vivo. Q&A, networking y análisis de proyectos reales.</p>
            </GlassCard>
          </FadeIn>

          {/* Card 3 - Users */}
          <FadeIn delay={300} className="h-full">
            <GlassCard hoverEffect className="flex flex-col items-center text-center py-12 px-6 h-full group">
                <div className="mb-8 relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-xl bg-white/5 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse" />
                  <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-500 ease-out shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                     <UsersRound className="w-7 h-7 icon-rainbow-neon" style={{ animationDelay: '1s' }} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-orange-100 transition-colors">Comunidad VIP</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">Acceso exclusivo a un Discord privado con recursos, presets y ofertas laborales.</p>
            </GlassCard>
          </FadeIn>
          
          {/* Card 4 - Package */}
          <FadeIn delay={400} className="h-full">
            <GlassCard hoverEffect className="flex flex-col items-center text-center py-12 px-6 h-full group">
                <div className="mb-8 relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-xl bg-white/5 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse" />
                  <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-500 ease-out shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                     <Package className="w-7 h-7 icon-rainbow-neon" style={{ animationDelay: '1.5s' }} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-emerald-100 transition-colors">Software y Presets</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">Incluye programas, plugins profesionales exclusivos y presets listos para usar.</p>
            </GlassCard>
          </FadeIn>
      </div>
    </div>
  </section>
);

const CreatorStory: React.FC = () => (
  <section className="py-32 px-4 relative">
    <div className="container mx-auto max-w-4xl text-center">
      <div className="flex flex-col items-center">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-tight tracking-tight text-glow-white">
            De editar gratis a trabajar con <span className="text-gradient drop-shadow-md">los mejores</span>
          </h2>
        </FadeIn>
        <div className="space-y-8 text-gray-300 text-xl leading-relaxed mb-12 font-light max-w-3xl mx-auto">
          <FadeIn delay={200}>
            <p>Antes cobraba <span className="text-red-500 font-bold text-glow-red">$200</span> dólares por mes editando muchos videos que no me pagaban lo suficiente. Ahora, con solo 1 o 2 proyectos al mes, estoy cobrando más de <span className="text-emerald-400 font-bold text-glow-green">$3,000 dólares</span>, hasta <span className="text-yellow-400 font-bold text-glow-gold">$5,000</span> si el proyecto lo amerita.</p>
          </FadeIn>
          <FadeIn delay={400}>
            <p>Hoy, he trabajado con <strong className="text-white font-medium text-2xl block mt-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">Rauw Alejandro, Emilia Mernes, Duki, Khea, Kun Agüero, YSY A, Thiago PZK, Lit Killah, y muchos más.</strong></p>
          </FadeIn>

          <FadeIn delay={500}>
            <div className="mt-8 p-6 bg-purple-900/20 border border-purple-500/30 rounded-2xl backdrop-blur-sm inline-block shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)]">
              <p className="text-purple-200 italic text-xl font-medium">"Trabajando con los mejores de la industria."</p>
            </div>
          </FadeIn>

          <FadeIn delay={600}>
               <div className="flex justify-center pt-4">
                 <a href="https://youtube.com/playlist?list=PLE3AyUAb-9ISDioqD_EtlENDrS_1es4oU&si=O8zivdSLdxkoCN4M&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnvarhxRuQ8ZJvP0IhOAkyW4yOqEuoB4AbGjBOwB_ML6LmwbO7sB5OwSqaq1o_aem_qa2m332gdZPWvmEWqbJQXw" target="_blank" rel="noopener noreferrer">
                   <Button className="text-lg px-10 py-5 !bg-none !bg-red-600 hover:!bg-red-500 shadow-[0_0_40px_-5px_rgba(220,38,38,0.4)] transform hover:scale-105 transition-all duration-300 border border-white/10">
                     MIRA MIS TRABAJOS
                   </Button>
                 </a>
               </div>
            </FadeIn>
        </div>
        <FadeIn delay={800}>
          <a href="https://e08ff1-xx.myshopify.com/" target="_blank" rel="noopener noreferrer">
            <Button className="!px-16 !py-8 !text-2xl !font-bold !bg-none !bg-green-500 hover:!bg-green-400 !text-white !border-none shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:shadow-[0_0_60px_rgba(34,197,94,0.8)] transform hover:scale-105 transition-all duration-300">Toda la tienda</Button>
          </a>
        </FadeIn>
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="py-12 border-t border-white/5 bg-[#0b0b10] text-center">
    <div className="container mx-auto px-4">
      <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ClashiVFX Formacion. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

/* 
  =============================================================================
  MAIN APP EXPORT
  =============================================================================
*/

export default function V0Component() {
  return (
    <>
      <style>{globalStyles}</style>
      <div className="min-h-screen text-white relative font-['Manrope'] bg-black selection:bg-purple-500/30 selection:text-white">
        <AnimatedBackground />
        <ScrollProgress />
        <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
            <span className="text-sm font-bold tracking-widest uppercase opacity-80 text-white">ClashiVFX</span>
        </nav>
        <main>
          <Hero />
          <WarningSection />
          <FeaturesGrid />
          <ProgramHighlights />
          <CreatorStory />
        </main>
        <Footer />
      </div>
    </>
  );
}