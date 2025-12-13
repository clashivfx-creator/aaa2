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
    
    // Requested Colors: Violet, Orange, Celeste
    const THEME_COLORS = [
      { r: 139, g: 92, b: 246 },  // Violet
      { r: 249, g: 115, b: 22 },  // Orange
      { r: 56, g: 189, b: 248 }   // Celeste (Light Blue)
    ];

    // Background Orbs settings
    const ORB_COUNT = 12; // Slightly fewer items since they are much bigger now
    const ORB_OPACITY = 0.06; // Lowered opacity (was 0.12) for a subtle atmospheric look

    // --- Classes ---

    // Ambient Glow Orbs (Atmospheric Layer)
    class Orb {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: { r: number, g: number, b: number };
      baseAlpha: number;

      constructor(colorIdx: number) {
        // HUGE RADIUS: Randomly between 50% and 90% of the screen's smallest dimension
        // This ensures they are very large and diffuse
        const minDim = Math.min(width, height);
        this.radius = Math.random() * (minDim * 0.4) + (minDim * 0.5); 
        
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        
        // Very slow, drifting movement
        this.vx = (Math.random() - 0.5) * 0.1;
        this.vy = (Math.random() - 0.5) * 0.1;
        
        this.color = THEME_COLORS[colorIdx % THEME_COLORS.length];
        this.baseAlpha = ORB_OPACITY + (Math.random() * 0.03); // Slight opacity variation
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Gentle bounce off screen edges with large buffer
        // We allow them to go partially off screen
        const buffer = this.radius * 0.5;
        if (this.x < -buffer) this.vx = Math.abs(this.vx);
        if (this.x > width + buffer) this.vx = -Math.abs(this.vx);
        if (this.y < -buffer) this.vy = Math.abs(this.vy);
        if (this.y > height + buffer) this.vy = -Math.abs(this.vy);
      }

      draw() {
        // Radial gradient for soft edges
        const g = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.baseAlpha})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // --- Initialization ---
    let orbs: Orb[] = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      orbs = [];
      for (let i = 0; i < ORB_COUNT; i++) {
        orbs.push(new Orb(i));
      }
    };

    // --- Animation Loop ---
    const animate = () => {
      if (!ctx) return;

      // Clear background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      // Draw Background Orbs
      // Use 'screen' composite operation to blend lights naturally
      ctx.globalCompositeOperation = 'screen'; 
      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });
      
      // Reset composite operation for next frame (if we were drawing other things)
      ctx.globalCompositeOperation = 'source-over';

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
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none -z-10" 
    />
  );
};