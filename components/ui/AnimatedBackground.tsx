import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-[#050508]">
      {/* 
        LIQUID MESH GRADIENT SYSTEM 
        Uses CSS animations to move large blurred blobs around, changing their scale and border-radius 
        to create a fluid, warping effect.
      */}
      
      <div className="absolute inset-0 opacity-40">
        {/* Blob 1: Purple - Top Left */}
        <div 
          className="absolute top-0 -left-40 w-[70vh] h-[70vh] bg-purple-600 rounded-full mix-blend-screen blur-[120px] opacity-40 animate-blob"
        />
        
        {/* Blob 2: Blue - Top Right (Delayed) */}
        <div 
          className="absolute top-0 -right-40 w-[70vh] h-[70vh] bg-blue-600 rounded-full mix-blend-screen blur-[120px] opacity-40 animate-blob animation-delay-2000"
        />
        
        {/* Blob 3: Pink - Bottom Left (Delayed more) */}
        <div 
          className="absolute -bottom-40 -left-40 w-[70vh] h-[70vh] bg-pink-600 rounded-full mix-blend-screen blur-[120px] opacity-40 animate-blob animation-delay-4000"
        />

        {/* Blob 4: Orange/Amber - Bottom Center (Floating up) */}
        <div 
          className="absolute -bottom-20 left-[40%] w-[60vh] h-[60vh] bg-orange-500/30 rounded-full mix-blend-screen blur-[100px] opacity-30 animate-float-center"
        />
      </div>

      {/* Glass Overlay Texture - Film Grain */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
      
      {/* Dark Vignette to keep focus in center */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, #000000 120%)'
        }}
      />
    </div>
  );
};