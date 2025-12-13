import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // --- Configuration ---
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const CONFIG = {
      baseColor: '#050505',
      particleCount: window.innerWidth < 768 ? 60 : 140, 
      mouseRange: 250, 
      // Reduced scrollFactor significantly (0.25) to create depth/parallax effect
      // The background moves slower than the foreground content
      scrollFactor: 0.25, 
    };

    // --- State ---
    const mouse = { x: -1000, y: -1000 };
    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    let scrollVelocity = 0;

    // --- Classes ---

    // 1. Ambient Background Orbs (Atmosphere)
    class Orb {
      x: number; y: number; vx: number; vy: number;
      radius: number; color: string;
      
      constructor(hue: number, xRel: number, yRel: number) {
        this.radius = Math.max(width, height) * 0.6; 
        this.x = width * xRel;
        this.y = height * yRel;
        this.vx = (Math.random() - 0.5) * 0.05;
        this.vy = (Math.random() - 0.5) * 0.05;
        this.color = `hsla(${hue}, 85%, 60%, 0.16)`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        const g = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0, this.color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // 2. Static Background Particles
    class Particle {
      baseX: number;
      baseY: number;
      size: number;
      baseHue: number;
      
      constructor() {
        this.baseX = Math.random() * width;
        this.baseY = Math.random() * height * 2; 
        this.size = Math.random() * 2 + 1; 
        
        const hues = [260, 30, 190]; 
        this.baseHue = hues[Math.floor(Math.random() * hues.length)] + (Math.random() * 40 - 20);
      }

      draw() {
        // Scroll calculation with low parallax factor for depth
        let screenY = (this.baseY - scrollY * CONFIG.scrollFactor) % height;
        if (screenY < 0) screenY += height;
        
        const screenX = this.baseX;

        const dx = mouse.x - screenX;
        const dy = mouse.y - screenY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Activate on lower velocity threshold so it feels responsive
        const isScrolling = Math.abs(scrollVelocity) > 0.5;
        const isHovered = dist < CONFIG.mouseRange;
        
        let color = 'rgba(255, 255, 255, 0.2)'; 
        let size = this.size;
        let glow = false;

        if (isScrolling || isHovered) {
          let intensity = 0;
          
          if (isHovered) {
            intensity = Math.max(intensity, 1 - dist / CONFIG.mouseRange);
          }
          if (isScrolling) {
             // Calculate intensity based on scroll speed
            intensity = Math.max(intensity, Math.min(Math.abs(scrollVelocity) / 8, 1));
          }

          // More vibrant, saturated colors when moving
          const alpha = 0.4 + intensity * 0.6;
          color = `hsla(${this.baseHue}, 95%, 65%, ${alpha})`;
          
          // Activate glow on both scroll and hover
          glow = true;
        }

        ctx!.fillStyle = color;
        
        if (glow) {
            // Stronger glow (increased blur radius)
            ctx!.shadowBlur = 20;
            ctx!.shadowColor = color;
        } else {
            ctx!.shadowBlur = 0;
        }

        ctx!.beginPath();
        ctx!.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx!.fill();
        
        ctx!.shadowBlur = 0; 
      }
    }

    // --- Initialization ---
    let orbs: Orb[] = [];
    let particles: Particle[] = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      orbs = [
        new Orb(260, 0.2, 0.2), 
        new Orb(30, 0.8, 0.3),  
        new Orb(190, 0.5, 0.8), 
        new Orb(280, 0.9, 0.9)  
      ];

      particles = [];
      for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // --- Animation Loop ---
    const animate = () => {
      if (!ctx) return;
      
      const currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollY = currentScrollY;
      
      ctx.fillStyle = CONFIG.baseColor;
      ctx.fillRect(0, 0, width, height);

      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });

      particles.forEach(p => {
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => init();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[#050505]" 
    />
  );
};