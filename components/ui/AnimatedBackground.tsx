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
    // Deep dark background
    const BG_COLOR = '#000000';
    
    // Requested Colors: Violet, Orange, Celeste
    // Subtle atmospheric lights
    const ORB_COLORS = [
      { r: 139, g: 92, b: 246 },  // Violet
      { r: 249, g: 115, b: 22 },  // Orange
      { r: 56, g: 189, b: 248 }   // Celeste (Light Blue)
    ];

    // Particle settings
    // CRITICAL CHANGE: 0 particles on mobile (< 768px)
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 0 : 100;
    
    const MOUSE_RANGE = 200;

    // --- State ---
    const mouse = { x: -1000, y: -1000 };
    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    let scrollVelocity = 0;

    // --- Classes ---

    // Ambient Glow Orbs (Atmospheric Layer)
    class Orb {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor(colorIdx: number) {
        this.radius = Math.min(width, height) * 0.6; // Slightly larger for better blending
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Slow, drifting movement
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        
        const c = ORB_COLORS[colorIdx % ORB_COLORS.length];
        // 5% Opacity as requested
        this.color = `rgba(${c.r}, ${c.g}, ${c.b}, 0.05)`; 
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Gentle bounce off screen edges
        if (this.x < -this.radius) this.vx = Math.abs(this.vx);
        if (this.x > width + this.radius) this.vx = -Math.abs(this.vx);
        if (this.y < -this.radius) this.vy = Math.abs(this.vy);
        if (this.y > height + this.radius) this.vy = -Math.abs(this.vy);
      }

      draw() {
        // Soft gradient for the "light" effect
        const g = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0, this.color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // VFX Particles (The "bolitas")
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      friction: number;
      size: number;
      baseHue: number;
      type: 'dot' | 'cross';

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.2; 
        this.vy = (Math.random() - 0.5) * 0.2;
        this.friction = 0.94; 
        this.size = Math.random() * 1.5 + 0.5; 
        this.type = Math.random() > 0.9 ? 'cross' : 'dot';
        this.baseHue = Math.random() * 360; 
      }

      update() {
        this.vy += scrollVelocity * 0.02;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RANGE) {
           const force = (MOUSE_RANGE - dist) / MOUSE_RANGE;
           const angle = Math.atan2(dy, dx);
           const push = force * 0.8;
           
           this.vx -= Math.cos(angle) * push;
           this.vy -= Math.sin(angle) * push;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.friction;
        this.vy *= this.friction;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const isMoved = speed > 0.3;

        let color = '';
        
        if (isMoved) {
            // Active: Glow & Color
            const lightness = 60; 
            const opacity = Math.min(speed * 0.3, 1);
            color = `hsla(${this.baseHue}, 90%, ${lightness}%, ${opacity})`;
            ctx!.shadowBlur = 15;
            ctx!.shadowColor = `hsla(${this.baseHue}, 90%, ${lightness}%, 1)`;
        } else {
            // Idle: Dim white
            color = `rgba(255, 255, 255, 0.03)`;
            ctx!.shadowBlur = 0;
            ctx!.shadowColor = 'transparent';
        }

        ctx!.fillStyle = color;
        ctx!.strokeStyle = color;

        if (this.type === 'cross') {
           const s = this.size; 
           ctx!.lineWidth = 0.5;
           ctx!.beginPath();
           ctx!.moveTo(this.x - s, this.y);
           ctx!.lineTo(this.x + s, this.y);
           ctx!.moveTo(this.x, this.y - s);
           ctx!.lineTo(this.x, this.y + s);
           ctx!.stroke();
        } else {
            if (speed > 1.5) {
                ctx!.lineWidth = this.size;
                ctx!.beginPath();
                ctx!.moveTo(this.x, this.y);
                ctx!.lineTo(this.x - this.vx * 3, this.y - this.vy * 3);
                ctx!.stroke();
            } else {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx!.fill();
            }
        }
        ctx!.shadowBlur = 0;
      }
    }

    // --- Initialization ---
    let orbs: Orb[] = [];
    let particles: Particle[] = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      const isMobileNow = width < 768;
      const count = isMobileNow ? 0 : 100;

      orbs = [];
      for (let i = 0; i < 3; i++) {
        orbs.push(new Orb(i));
      }

      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    // --- Animation Loop ---
    const animate = () => {
      if (!ctx) return;

      // Clear background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      // Draw Atmospheric Layer (Orbs)
      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });

      // Draw VFX Field (Particles) - Array will be empty on mobile
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      scrollVelocity *= 0.9;
      requestAnimationFrame(animate);
    };

    const onResize = () => init();

    const onScroll = () => {
       scrollY = window.scrollY;
       scrollVelocity = scrollY - lastScrollY;
       lastScrollY = scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
       mouse.x = e.clientX;
       mouse.y = e.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
       mouse.x = e.touches[0].clientX;
       mouse.y = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
       mouse.x = -1000;
       mouse.y = -1000;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none -z-10" 
    />
  );
};