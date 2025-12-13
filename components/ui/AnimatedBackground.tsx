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
      baseColor: '#000000', // Pure black for maximum contrast
      particleCount: window.innerWidth < 768 ? 50 : 120, 
      mouseRange: 250, 
      scrollFactor: 0.25,
      // Factor for the fade-out delay (Lower = slower fade out)
      // 0.05 corresponds roughly to a 0.5s smooth transition
      lerpFactor: 0.05 
    };

    // --- State ---
    const mouse = { x: -1000, y: -1000 };
    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    let scrollVelocity = 0;
    let animationFrameId: number;
    let time = 0;

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
        // Reduced opacity (0.16 -> 0.12) for darker background
        this.color = `hsla(${hue}, 85%, 55%, 0.12)`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        // No blur on orbs to save performance, they are gradients anyway
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
      randomOffset: number;
      currentIntensity: number; // For smooth fading
      
      constructor() {
        this.baseX = Math.random() * width;
        this.baseY = Math.random() * height * 2; 
        // Slightly larger for "bokeh" blur effect
        this.size = Math.random() * 2.5 + 1.5; 
        this.randomOffset = Math.random() * 100;
        this.currentIntensity = 0; // Starts at 0
        
        const hues = [260, 30, 190]; 
        this.baseHue = hues[Math.floor(Math.random() * hues.length)] + (Math.random() * 40 - 20);
      }

      draw() {
        // 1. Idle Movement (Floating)
        // Add subtle sine wave movement based on time
        const floatX = Math.sin(time * 0.001 + this.randomOffset) * 20; // 20px horizontal drift
        const floatY = Math.cos(time * 0.001 + this.randomOffset) * 20; // 20px vertical drift

        // 2. Position Calculation
        let screenY = (this.baseY + floatY - scrollY * CONFIG.scrollFactor) % height;
        if (screenY < 0) screenY += height;
        
        const screenX = this.baseX + floatX;

        // 3. Interaction Logic
        const dx = mouse.x - screenX;
        const dy = mouse.y - screenY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const isScrolling = Math.abs(scrollVelocity) > 0.5;
        const isHovered = dist < CONFIG.mouseRange;
        
        // 4. Intensity Target Calculation
        let targetIntensity = 0;
        
        if (isHovered) {
          targetIntensity = Math.max(targetIntensity, 1 - dist / CONFIG.mouseRange);
        }
        if (isScrolling) {
          targetIntensity = Math.max(targetIntensity, Math.min(Math.abs(scrollVelocity) / 8, 1));
        }

        // 5. Smooth Lerp (Linear Interpolation) for the "Delay" effect
        // Move currentIntensity towards targetIntensity slowly
        this.currentIntensity += (targetIntensity - this.currentIntensity) * CONFIG.lerpFactor;

        // 6. Visual Application
        
        // Saturation: 0% (White) -> 90% (Color)
        const saturation = this.currentIntensity * 90; 
        // Lightness: 60% (Greyish) -> 70% (Bright)
        const lightness = 60 + this.currentIntensity * 10;
        // Alpha: 0.1 (Faint) -> 0.8 (Visible)
        const alpha = 0.1 + this.currentIntensity * 0.7;

        const color = `hsla(${this.baseHue}, ${saturation}%, ${lightness}%, ${alpha})`;

        ctx!.fillStyle = color;
        
        // Blur logic:
        // Always minimal blur (5px shadow) to look defocused
        // Intense blur (25px shadow) when active
        const blurRadius = 5 + (this.currentIntensity * 20);
        
        ctx!.shadowBlur = blurRadius;
        ctx!.shadowColor = color;

        ctx!.beginPath();
        ctx!.arc(screenX, screenY, this.size, 0, Math.PI * 2);
        ctx!.fill();
        
        ctx!.shadowBlur = 0; // Reset
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
      
      time += 16; // Approx 1 frame at 60fps
      
      ctx.fillStyle = CONFIG.baseColor;
      ctx.fillRect(0, 0, width, height);
      
      // Global slight blur for "desenfocadas" effect
      // This is efficient on modern browsers
      ctx.filter = 'blur(0.8px)';

      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });

      particles.forEach(p => {
        p.draw();
      });

      ctx.filter = 'none'; // Reset filter

      animationFrameId = requestAnimationFrame(animate);
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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-black" 
    />
  );
};