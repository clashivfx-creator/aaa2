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
    
    // Requested Colors: Violet, Orange, Celeste (Sky Blue)
    const THEME_COLORS = [
      { r: 139, g: 92, b: 246 },  // Violet-500
      { r: 249, g: 115, b: 22 },  // Orange-500
      { r: 56, g: 189, b: 248 }   // Sky-400 (Celeste)
    ];

    // Settings
    const ORB_COUNT = 10; 
    const ORB_OPACITY = 0.10; // Exactly 10% opacity as requested

    class Orb {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: { r: number, g: number, b: number };

      constructor(colorIdx: number) {
        // Large Size: 40% to 90% of screen minimum dimension
        const minDim = Math.min(width, height);
        this.radius = Math.random() * (minDim * 0.5) + (minDim * 0.4); 
        
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        
        // Subtle drift movement
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        
        this.color = THEME_COLORS[colorIdx % THEME_COLORS.length];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce gently off bounds with large buffer
        const buffer = this.radius * 0.5;
        if (this.x < -buffer) this.vx = Math.abs(this.vx);
        if (this.x > width + buffer) this.vx = -Math.abs(this.vx);
        if (this.y < -buffer) this.vy = Math.abs(this.vy);
        if (this.y > height + buffer) this.vy = -Math.abs(this.vy);
      }

      draw() {
        const g = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${ORB_OPACITY})`);
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

      // Clear background with solid black
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      // Draw orbs using normal blending for smoothest gradient (no screen mode artifacts)
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
    // 'hidden md:block' hides it on mobile, shows on tablet/desktop.
    // 'blur-[80px]' ensures the canvas result is extremely soft, removing any "grid" or banding feel.
    <canvas 
      ref={canvasRef} 
      className="hidden md:block fixed inset-0 w-full h-full pointer-events-none -z-10 blur-[80px]" 
    />
  );
};