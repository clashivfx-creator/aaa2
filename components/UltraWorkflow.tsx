
import React, { useRef, useState, useContext, useEffect } from 'react';
import { FadeIn } from './ui/FadeIn';
import { 
  Check,
  Star,
  ZapIcon,
  ChevronDown
} from 'lucide-react';
import { LanguageContext } from '../App';

// Componente para cargar videos de forma inteligente y fluida
const LazyVideo = ({ src, className, aspect }: { src: string, className?: string, aspect?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect(); // Una vez que carga, se queda cargado para evitar parpadeos
        }
      },
      { threshold: 0.01, rootMargin: '400px' } // Carga con anticipación
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${aspect || 'aspect-video'} ${className} bg-white/5`}>
      {shouldLoad ? (
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover will-change-transform transform-gpu"
          src={src}
        />
      ) : (
        <div className="w-full h-full bg-black/20 animate-pulse" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

const FeatureList = React.memo(() => {
  const { t } = useContext(LanguageContext);
  return (
    <ul className="space-y-3 sm:space-y-5 mb-8 sm:mb-12">
      {[
        t('workflow.vfx'),
        t('workflow.oneclick'),
        t('workflow.save_time'),
        t('workflow.optim')
      ].map((item, i) => (
        <li key={i} className="flex items-start gap-3 sm:gap-5 text-gray-300 text-sm sm:text-base font-medium tracking-tight text-left">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" />
          </div>
          {item}
        </li>
      ))}
    </ul>
  );
});

const SectionText = React.memo(({ number, title, desc, isHovered, align = 'left' }: { 
  number: string, 
  title: string, 
  desc: string, 
  isHovered: boolean, 
  align?: 'left' | 'right'
}) => {
  const { t } = useContext(LanguageContext);
  const shopifyUrl = "https://e08ff1-xx.myshopify.com/products/pack-avanzado-copia-1";

  return (
    <div className={`flex flex-col justify-center max-w-md transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) relative transform-gpu
      ${isHovered ? (align === 'left' ? 'lg:-translate-x-8 lg:scale-105 lg:z-[70] z-10' : 'lg:translate-x-8 lg:scale-105 lg:z-[70] z-10') : 'translate-x-0 z-10'}
    `}>
      <span className="text-purple-500 font-bold text-xs sm:text-sm tracking-widest mb-2 sm:mb-4 opacity-70 uppercase">{number}</span>
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 sm:mb-6 leading-tight text-left">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed mb-6 sm:mb-10 text-base sm:text-lg font-light text-left">
        {desc}
      </p>
      <a href={shopifyUrl} target="_blank" rel="noopener noreferrer" className="block w-full sm:w-fit">
        <button className="btn-premium-3d w-full py-4 sm:py-5 px-8 sm:px-12 text-sm">
          {t('workflow.access')}
        </button>
      </a>
    </div>
  );
});

const VideoContainer = ({ 
  src, 
  isHovered, 
  onHover, 
  onLeave, 
  noZoom = false,
  aspect = "aspect-video",
  className = "",
  side = "right" 
}: { 
  src: string, 
  isHovered: boolean, 
  onHover?: () => void, 
  onLeave?: () => void, 
  noZoom?: boolean, 
  aspect?: string,
  className?: string,
  side?: "left" | "right"
}) => {
  const translation = side === "right" ? "lg:translate-x-12" : "lg:-translate-x-12";
  
  return (
    <div 
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative group p-[1px] rounded-[1.5rem] sm:rounded-[2.5rem] origin-center transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) transform-gpu
        ${!noZoom && isHovered ? `lg:scale-[1.15] ${translation} lg:z-[100] z-10 lg:shadow-[0_30px_100px_rgba(0,0,0,0.8)]` : 'z-10 scale-100 translate-x-0'}
        ${className}
      `}
    >
      {!noZoom && (
        <div className={`absolute -inset-4 sm:-inset-10 bg-purple-500/5 blur-[20px] rounded-full transition-opacity duration-500 pointer-events-none ${isHovered ? 'lg:opacity-100 opacity-0' : 'opacity-0'}`} />
      )}
      
      <div className={`relative z-10 bg-[#050505] rounded-[1.45rem] sm:rounded-[2.45rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-purple-500/40 transform-gpu`}>
        <LazyVideo src={src} aspect={aspect} />
      </div>
    </div>
  );
};

export const UltraWorkflow: React.FC = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const { t } = useContext(LanguageContext);
  const featuresHeaderRef = useRef<HTMLDivElement>(null);
  const shopifyUrl = "https://e08ff1-xx.myshopify.com/products/pack-avanzado-copia-1";

  // Enlaces permanentes de Cloudinary
  const layersVideo = "https://res.cloudinary.com/dbu9kzomq/video/upload/v1769186132/PERFORMANCE_ecytm6.mp4";
  const curvesVideo = "https://res.cloudinary.com/dbu9kzomq/video/upload/v1769186123/curvas_szgnwo.mp4";
  const optimizeVideo = "https://res.cloudinary.com/dbu9kzomq/video/upload/v1769186098/BOTON_OPTIMIZAR_to4df3.mp4";
  const searchBarVideo = "https://res.cloudinary.com/dbu9kzomq/video/upload/v1769186099/BARRA_DE_BUSQUEDA_sfxmct.mp4";
  const moreFeaturesVideo = "https://res.cloudinary.com/dbu9kzomq/video/upload/v1769186125/MAS_FUNCIONES_xldvk9.mp4";
  const mainVideoUrl = "https://res.cloudinary.com/dbu9kzomq/video/upload/v1769186159/VIDEO_PRINCIAL_AL_LADO_DEL_PRECIO_auh5rv.mp4";

  const videoAspect = "aspect-[1366/766]";

  const scrollToFeatures = () => {
    featuresHeaderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-[#000000] min-h-screen text-white overflow-x-hidden pt-4 sm:pt-10">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[80%] h-[70%] bg-purple-500/5 blur-[60px] rounded-full animate-float-slow transform-gpu" />
      </div>

      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 max-w-[1600px] pt-4 sm:pt-10 pb-20 sm:pb-40 relative z-[1]">
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start mb-20 sm:mb-40 relative z-10">
          <div className="lg:col-span-8 flex flex-col order-1">
             <FadeIn delay={100} className="w-full flex flex-col items-center">
                <VideoContainer src={mainVideoUrl} isHovered={false} noZoom={true} className="w-full" aspect={videoAspect} />
                <button 
                  onClick={scrollToFeatures}
                  className="mt-8 flex flex-col items-center gap-2 group transition-all duration-300 hover:scale-110"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] animate-bounce group-hover:bg-white/10 group-hover:border-white/20">
                    <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 text-white/60 group-hover:text-white" />
                  </div>
                </button>
             </FadeIn>
          </div>

          <div className="lg:col-span-4 flex flex-col order-2 h-full">
            <FadeIn delay={300} className="h-full">
              <div 
                className="h-full bg-violet-900/20 backdrop-blur-xl border border-violet-500/30 rounded-3xl sm:rounded-[3rem] p-6 sm:p-12 lg:p-10 xl:p-12 shadow-[0_0_50px_rgba(139,92,246,0.1)] flex flex-col overflow-hidden transform-gpu"
                style={{ containerType: 'inline-size' } as React.CSSProperties}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-1 text-yellow-500/80">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 sm:w-5 h-3.5 sm:h-5 fill-current" />)}
                  </div>
                  <div className="bg-purple-500/10 text-purple-400 text-[8px] sm:text-xs font-bold px-2 sm:px-4 py-1 rounded-full border border-purple-500/20 uppercase tracking-widest shrink-0 ml-4">Featured</div>
                </div>
                
                <h2 className="text-[min(11.8cqw,3rem)] sm:text-[min(11.8cqw,4.5rem)] font-black tracking-tighter mb-6 sm:mb-10 text-left whitespace-nowrap overflow-hidden">
                  ULTRAWORKFLOW
                </h2>
                <div className="flex-1"><FeatureList /></div>
                <div className="pt-6 sm:pt-10 border-t border-white/10 mt-auto text-left">
                  <div className="flex items-baseline gap-2 sm:gap-4 mb-6 sm:mb-10">
                    <span className="text-gray-500 line-through text-lg sm:text-xl font-medium">$50</span>
                    <span className="text-4xl sm:text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
                      $39,99
                    </span>
                  </div>
                  <div className="bg-purple-500/10 text-purple-300 text-[10px] sm:text-xs font-bold py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl text-center uppercase tracking-widest border border-purple-500/20 mb-4 sm:mb-8">
                    {t('workflow.offer')}
                  </div>
                  <a href={shopifyUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                    <button className="btn-premium-3d w-full py-4 sm:py-6 text-sm">
                      {t('workflow.access')} <ZapIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    </button>
                  </a>
                  <p className="text-[8px] sm:text-xs text-center text-gray-500 mt-6 sm:mt-10 font-bold uppercase tracking-widest">{t('workflow.download')}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* FEATURES HEADER */}
        <div ref={featuresHeaderRef} className="text-center mb-16 sm:mb-32 mt-16 sm:mt-48 scroll-mt-24">
          <FadeIn>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 sm:mb-8 uppercase">
              {t('workflow.features_title')}
            </h2>
            <p className="text-gray-400 text-base sm:text-xl font-medium tracking-tight px-4">{t('workflow.features_desc')}</p>
          </FadeIn>
        </div>

        {/* FEATURES LISTING */}
        <div className="space-y-24 sm:space-y-48 mb-20 sm:mb-80">
          <FeatureBlock index="01" title={t('workflow.f1_title')} desc={t('workflow.f1_desc')} video={layersVideo} hoveredSection={hoveredSection} setHoveredSection={setHoveredSection} side="right" />
          <FeatureBlock index="02" title={t('workflow.f2_title')} desc={t('workflow.f2_desc')} video={curvesVideo} hoveredSection={hoveredSection} setHoveredSection={setHoveredSection} side="left" />
          <FeatureBlock index="03" title={t('workflow.f3_title')} desc={t('workflow.f3_desc')} video={optimizeVideo} hoveredSection={hoveredSection} setHoveredSection={setHoveredSection} side="right" />
          <FeatureBlock index="04" title={t('workflow.f5_title')} desc={t('workflow.f5_desc')} video={searchBarVideo} hoveredSection={hoveredSection} setHoveredSection={setHoveredSection} side="left" />
          <FeatureBlock index="05" title={t('workflow.f4_title')} desc={t('workflow.f4_desc')} video={moreFeaturesVideo} hoveredSection={hoveredSection} setHoveredSection={setHoveredSection} side="right" />
        </div>
      </div>
    </div>
  );
};

const FeatureBlock = React.memo(({ index, title, desc, video, hoveredSection, setHoveredSection, side }: any) => {
  const isRight = side === "right";
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-24 items-center relative z-10 transform-gpu">
      <div className={`relative flex justify-center ${isRight ? 'lg:justify-end lg:pr-10 order-2 lg:order-1' : 'order-1 lg:order-2 lg:justify-start lg:pl-10'}`}>
        <FadeIn>
          <SectionText number={index} title={title} desc={desc} isHovered={hoveredSection === index} align={isRight ? 'left' : 'right'} />
        </FadeIn>
      </div>
      <div className={`relative flex justify-center ${isRight ? 'order-1 lg:order-2 lg:justify-start' : 'order-1 lg:order-1 lg:justify-end'}`}>
        <FadeIn className="w-full max-w-2xl">
          <VideoContainer 
            src={video} 
            isHovered={hoveredSection === index} 
            onHover={() => setHoveredSection(index)} 
            onLeave={() => setHoveredSection(null)} 
            side={isRight ? "right" : "left"} 
            aspect="aspect-[1366/766]" 
          />
        </FadeIn>
      </div>
    </div>
  );
});
