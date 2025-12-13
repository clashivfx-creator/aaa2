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
    const ORB_COUNT = 15; // Increased amount of lights
    const ORB_OPACITY = 0.12; // Increased opacity (was 0.05)

    // Mouse Trail settings
    const TRAIL_MAX_AGE = 25; // How long the trail lingers
    const TRAIL_SPAWN_RATE = 2; // Higher = fewer gaps

    // --- State ---
    const mouse = { x: -1000, y: -1000 };
    
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
        // Variation in size
        this.radius = Math.random() * (Math.min(width, height) * 0.4) + 100; 
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Slow, drifting movement
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        
        this.color = THEME_COLORS[colorIdx % THEME_COLORS.length];
        this.baseAlpha = ORB_OPACITY + (Math.random() * 0.05); // Slight opacity variation
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Gentle bounce off screen edges with buffer
        const buffer = this.radius;
        if (this.x < -buffer) this.vx = Math.abs(this.vx);
        if (this.x > width + buffer) this.vx = -Math.abs(this.vx);
        if (this.y < -buffer) this.vy = Math.abs(this.vy);
        if (this.y > height + buffer) this.vy = -Math.abs(this.vy);
      }

      draw() {
        const g = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.baseAlpha})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // Elegant Mouse Trail (Subtle Glows)
    class TrailNode {
      x: number;
      y: number;
      age: number;
      radius: number;
      color: { r: number, g: number, b: number };

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.age = 0;
        this.radius = Math.random() * 40 + 30; // Soft glow size
        // Pick a random theme color for the trail glow
        this.color = THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
      }

      update() {
        this.age++;
      }

      draw() {
        const lifePercent = this.age / TRAIL_MAX_AGE;
        if (lifePercent >= 1) return;

        // Alpha fades out
        const alpha = (1 - lifePercent) * 0.3; // Max opacity 0.3 for subtlety

        const g = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        // Core is slightly white/bright, outer is colored
        g.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`);
        g.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.5})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');

        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      isDead() {
        return this.age >= TRAIL_MAX_AGE;
      }
    }

    // --- Initialization ---
    let orbs: Orb[] = [];
    let trail: TrailNode[] = [];
    let frameCount = 0;

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

      // Clear background with solid color (no trails from moving objects)
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Background Orbs
      ctx.globalCompositeOperation = 'screen'; // Blends lights nicely
      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });

      // 2. Draw Mouse Trail
      // Use lighter blending for the trail
      ctx.globalCompositeOperation = 'lighter'; 
      for (let i = trail.length - 1; i >= 0; i--) {
        const node = trail[i];
        node.update();
        node.draw();
        if (node.isDead()) {
          trail.splice(i, 1);
        }
      }

      // Reset composition
      ctx.globalCompositeOperation = 'source-over';

      frameCount++;
      requestAnimationFrame(animate);
    };

    const onResize = () => init();

    const onMouseMove = (e: MouseEvent) => {
       mouse.x = e.clientX;
       mouse.y = e.clientY;

       // Add trail node occasionally to prevent performance heavy continuous gradients
       // But frequent enough to look like a line/path
       if (frameCount % TRAIL_SPAWN_RATE === 0) {
         trail.push(new TrailNode(mouse.x, mouse.y));
       }
    };

    const onTouchMove = (e: TouchEvent) => {
       mouse.x = e.touches[0].clientX;
       mouse.y = e.touches[0].clientY;
       if (frameCount % TRAIL_SPAWN_RATE === 0) {
         trail.push(new TrailNode(mouse.x, mouse.y));
       }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none -z-10" 
    />
  );
};