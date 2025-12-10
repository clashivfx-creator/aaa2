import React, { useEffect, useState } from 'react';

export const AnimatedBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-black">
      {/* 1. Base Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050508] to-[#0a0a0f]" />
      
      {/* 2. Apple-style Mesh Gradients (The "Aurora") */}
      {/* These are large, heavily blurred, moving blobs of color */}
      
      {/* Primary Purple Glow - Top Left */}
      <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen opacity-30 animate-drift blur-[100px]"
           style={{ background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, rgba(88, 28, 135, 0) 70%)' }} />

      {/* Deep Blue Depth - Top Right */}
      <div className="absolute top-[0%] right-[0%] w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-20 animate-drift-slow blur-[120px]"
           style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(30, 58, 138, 0) 70%)' }} />

      {/* Pink/Magenta Accent - Bottom Left */}
      <div className="absolute bottom-[0%] -left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-20 animate-drift-slower blur-[100px]"
           style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, rgba(131, 24, 67, 0) 70%)' }} />

      {/* Cyan/Green Hint - Bottom Right */}
      <div className="absolute -bottom-[10%] right-[0%] w-[50vw] h-[50vw] rounded-full mix-blend-screen opacity-10 animate-drift blur-[80px]"
           style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(6, 78, 59, 0) 70%)' }} />

      {/* 3. Interactive Mouse Glow ("Volumetric Light") */}
      <div
        className="absolute transition-transform duration-1000 cubic-bezier(0.2, 0.8, 0.2, 1) will-change-transform"
        style={{
          left: 0,
          top: 0,
          width: '800px',
          height: '800px',
          transform: `translate(${mousePosition.x - 400}px, ${mousePosition.y - 400}px)`,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 70%)',
          filter: 'blur(40px)',
          mixBlendMode: 'overlay', // This makes it brighten the colors behind it
        }}
      />
      
      {/* 4. Texture Overlay (Noise) - The key to the "Apple" look */}
      <div className="bg-noise" />

      {/* 5. Vignette to focus center */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.8) 100%)'
        }}
      />
    </div>
  );
};