import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // --- Configuration ---
    const BG_COLOR = '#000000';
    
    // Requested Colors
    const THEME_COLORS = [
      { r: 139, g: 92, b: 246 },  // Violet-500
      { r: 249, g: 115, b: 22 },  // Orange-500
      { r: 56, g: 189, b: 248 }   // Sky-400
    ];

    // Settings
    const ORB_COUNT = 10; 
    
    // TRICK TO FIX BANDING:
    // We draw with HIGH opacity internally (0.8) to use the full 0-255 color range,
    // creating a smooth gradient without steps.
    // Then we lower the opacity of the entire canvas via CSS to make it subtle.
    const INTERNAL_ORB_OPACITY = 0.8; 

    class Orb {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: { r: number, g: number, b: number };

      constructor(colorIdx: number) {
        const minDim = Math.min(width, height);
        this.radius = Math.random() * (minDim * 0.5) + (minDim * 0.4); 
        
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        
        this.color = THEME_COLORS[colorIdx % THEME_COLORS.length];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        const buffer = this.radius * 0.5;
        if (this.x < -buffer) this.vx = Math.abs(this.vx);
        if (this.x > width + buffer) this.vx = -Math.abs(this.vx);
        if (this.y < -buffer) this.vy = Math.abs(this.vy);
        if (this.y > height + buffer) this.vy = -Math.abs(this.vy);
      }

      draw() {
        // Create gradient with high opacity
        const g = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${INTERNAL_ORB_OPACITY})`);
        g.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
        
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    let orbs: Orb[] = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      orbs = [];
      for (let i = 0; i < ORB_COUNT; i++) {
        orbs.push(new Orb(i));
      }
    };

    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'source-over'; 
      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });
      
      requestAnimationFrame(animate);
    };

    const onResize = () => init();

    window.addEventListener('resize', onResize);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="hidden md:block fixed inset-0 w-full h-full pointer-events-none -z-10">
      {/* 
        Canvas Layer:
        opacity-[0.08] scales the internal 0.8 opacity down to ~0.064 effective visual opacity.
        blur-[120px] helps smooth out the shapes even more.
      */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full blur-[120px] opacity-[0.08]" 
      />

      {/* 
        Dithering Layer:
        A barely visible static noise layer (3% opacity) overlaid on top.
        This breaks up the color bands on monitors, making gradients look perfectly smooth.
      */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};