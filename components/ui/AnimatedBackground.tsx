import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-black">
      {/* 1. Base Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050508] to-[#0a0a0f]" />
      
      {/* 2. Apple-style Mesh Gradients (The "Aurora") */}
      {/* These are large, heavily blurred, moving blobs of color with increased autonomous movement */}
      
      {/* Primary Purple Glow - Top Left */}
      <div className="absolute -top-[10%] -left-[10%] w-[80vw] h-[80vw] rounded-full mix-blend-screen opacity-30 animate-blob blur-[100px]"
           style={{ background: 'radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, rgba(88, 28, 135, 0) 70%)' }} />

      {/* Deep Blue Depth - Top Right */}
      <div className="absolute top-[0%] right-[0%] w-[70vw] h-[70vw] rounded-full mix-blend-screen opacity-20 animate-blob animation-delay-2000 blur-[120px]"
           style={{ 
             background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(30, 58, 138, 0) 70%)',
             animationDirection: 'reverse'
           }} />

      {/* Pink/Magenta Accent - Bottom Left */}
      <div className="absolute bottom-[0%] -left-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen opacity-20 animate-blob animation-delay-4000 blur-[100px]"
           style={{ 
             background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(131, 24, 67, 0) 70%)',
             animationDuration: '25s'
           }} />

      {/* Cyan/Green Hint - Bottom Right */}
      <div className="absolute -bottom-[10%] right-[0%] w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-10 animate-blob blur-[80px]"
           style={{ 
             background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(6, 78, 59, 0) 70%)',
             animationDirection: 'reverse',
             animationDuration: '22s'
           }} />

      {/* 3. Center Floating Light (Replaces Mouse Interaction) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="w-[1000px] h-[1000px] rounded-full animate-float-center"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 70%)',
            filter: 'blur(50px)',
            mixBlendMode: 'overlay',
          }}
        />
      </div>
      
      {/* 4. Texture Overlay (Noise) */}
      <div className="bg-noise absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none z-[-1]" />

      {/* 5. Vignette to focus center */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.85) 100%)'
        }}
      />
    </div>
  );
};