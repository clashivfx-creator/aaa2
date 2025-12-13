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
    // Deep dark background (Pure Black for max contrast with glow)
    const BG_COLOR = '#000000';
    
    // Apple-style glow colors (Violet, Orange, Cyan) - Even Lower saturation/opacity for background
    const ORB_COLORS = [
      { r: 80, g: 40, b: 160 }, // Deep Violet
      { r: 160, g: 60, b: 40 }, // Deep Orange
      { r: 40, g: 120, b: 160 } // Deep Cyan
    ];

    // Particle settings
    const PARTICLE_COUNT = window.innerWidth < 768 ? 60 : 140;
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
        this.radius = Math.min(width, height) * 0.5; // Large soft blobs
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Very slow, organic movement
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        
        const c = ORB_COLORS[colorIdx % ORB_COLORS.length];
        // Extremely low opacity for "diffused light" (Darker than before)
        this.color = `rgba(${c.r}, ${c.g}, ${c.b}, 0.02)`; 
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Gentle bounce
        if (this.x < -this.radius) this.vx = Math.abs(this.vx);
        if (this.x > width + this.radius) this.vx = -Math.abs(this.vx);
        if (this.y < -this.radius) this.vy = Math.abs(this.vy);
        if (this.y > height + this.radius) this.vy = -Math.abs(this.vy);
      }

      draw() {
        // No glow for background orbs to save perf
        ctx!.shadowBlur = 0;
        const g = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0, this.color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // VFX Particles (Field)
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
        // Assign a random neon color hue to each particle
        this.baseHue = Math.random() * 360; 
      }

      update() {
        // 1. Scroll Influence
        this.vy += scrollVelocity * 0.02;

        // 2. Interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RANGE) {
           const force = (MOUSE_RANGE - dist) / MOUSE_RANGE;
           const angle = Math.atan2(dy, dx);
           const push = force * 0.8; // Stronger push
           
           this.vx -= Math.cos(angle) * push;
           this.vy -= Math.sin(angle) * push;
        }

        // 3. Physics
        this.x += this.vx;
        this.y += this.vy;

        // 4. Friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        // 5. Wrap
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        
        // Threshold to determine if "active" (moving fast enough to glow)
        const isMoved = speed > 0.3;

        let color = '';
        let blur = 0;
        
        if (isMoved) {
            // --- ACTIVE STATE (Glow + Color) ---
            // Brightness and Opacity increase with speed
            const lightness = 60; 
            const opacity = Math.min(speed * 0.3, 1);
            
            // Dynamic color
            color = `hsla(${this.baseHue}, 90%, ${lightness}%, ${opacity})`;
            
            // Add Glow
            ctx!.shadowBlur = 15; // Intense glow
            ctx!.shadowColor = `hsla(${this.baseHue}, 90%, ${lightness}%, 1)`;
        } else {
            // --- IDLE STATE (Dim + White/Grey) ---
            // Very subtle white, no glow
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
                // Stretch into line if moving fast (Kinetic effect)
                ctx!.lineWidth = this.size;
                ctx!.beginPath();
                ctx!.moveTo(this.x, this.y);
                ctx!.lineTo(this.x - this.vx * 3, this.y - this.vy * 3); // Longer trail
                ctx!.stroke();
            } else {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx!.fill();
            }
        }
        
        // Reset shadow for next iteration to prevent bleeding if batching (though here we set it explicitly)
        ctx!.shadowBlur = 0;
      }
    }

    // --- Initialization ---
    let orbs: Orb[] = [];
    let particles: Particle[] = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      orbs = [];
      for (let i = 0; i < 3; i++) {
        orbs.push(new Orb(i));
      }

      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    // --- Animation Loop ---
    const animate = () => {
      if (!ctx) return;

      // 1. Clear background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Atmospheric Layer (Orbs)
      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });

      // 3. Draw VFX Field (Particles)
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // 4. Decay Scroll Velocity
      scrollVelocity *= 0.9;

      requestAnimationFrame(animate);
    };

    // --- Event Handlers ---
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