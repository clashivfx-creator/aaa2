import React, { useEffect, useState } from 'react';

export const AnimatedBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-[#000000]">
      {/* 
        BASE GRADIENT: Deep Charcoal/Black 
        Provides the "glossy dark" foundation.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#08080a] to-[#020203]" />

      {/* 
        AMBIENT GLOWS: "Soft volumetric light blobs with heavy gaussian blur"
        Using deeper, more sophisticated colors (Indigo, Slate, Deep Purple) instead of bright pinks.
      */}
      
      {/* Deep Indigo/Purple - Top Center - The main "Atmosphere" */}
      <div 
        className="absolute -top-[20%] left-[20%] w-[80vw] h-[80vw] bg-indigo-950/30 rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-blob"
      />

      {/* Subtle Cold Blue - Top Right - Adds the "Tech" feel */}
      <div 
        className="absolute top-[10%] -right-[20%] w-[60vw] h-[60vw] bg-slate-900/40 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob animation-delay-2000"
      />

      {/* Deep Violet - Bottom Left - Anchors the design */}
      <div 
        className="absolute -bottom-[20%] -left-[10%] w-[70vw] h-[70vw] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-blob animation-delay-4000"
      />

      {/* 
        MOUSE INTERACTION: "Glossy" spotlight
        Instead of a color gradient, we use a very subtle white/blue gloss to simulate light hitting a dark surface.
      */}
      <div
        className="absolute transition-transform duration-500 ease-out will-change-transform"
        style={{
          left: 0,
          top: 0,
          width: '1200px',
          height: '1200px',
          transform: `translate(${mousePosition.x - 600}px, ${mousePosition.y - 600}px)`,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 
        PRO DETAIL: CINEMATIC VIGNETTE 
        Darkens the edges of the screen to focus the eye on the center content.
      */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 120%)'
        }}
      />
      
      {/* NOISE TEXTURE REMOVED for clean, smooth aesthetic */}
    </div>
  );
};