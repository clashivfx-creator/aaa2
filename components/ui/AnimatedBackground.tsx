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
    const BG_COLOR = '#050505';
    
    // Apple-style glow colors (Violet, Orange, Cyan) - Low saturation
    const ORB_COLORS = [
      { r: 120, g: 80, b: 200 }, // Soft Violet
      { r: 200, g: 100, b: 80 }, // Soft Orange
      { r: 60, g: 180, b: 200 }  // Soft Cyan
    ];

    // Particle settings
    const PARTICLE_COUNT = window.innerWidth < 768 ? 50 : 120;
    const CONNECTION_DIST = 100;
    const MOUSE_RANGE = 180;

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
        // Extremely low opacity for "diffused light through glass" feel
        this.color = `rgba(${c.r}, ${c.g}, ${c.b}, 0.04)`; 
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
        const g = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0, this.color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx!.fillStyle = g;
        // Draw huge soft circle
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
      type: 'dot' | 'cross';

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.2; // Initial slight drift
        this.vy = (Math.random() - 0.5) * 0.2;
        this.friction = 0.94; // Smooth deceleration
        this.size = Math.random() * 1.5 + 0.5; // Micro sizes
        this.type = Math.random() > 0.9 ? 'cross' : 'dot'; // 10% abstract shapes
      }

      update() {
        // 1. Scroll Influence (Flow)
        // Adds a gentle vertical push based on scroll speed
        this.vy += scrollVelocity * 0.02;

        // 2. Interaction (Mouse/Touch Field)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RANGE) {
           const force = (MOUSE_RANGE - dist) / MOUSE_RANGE;
           // Gentle repulsion/energizing
           const angle = Math.atan2(dy, dx);
           const push = force * 0.6; 
           
           this.vx -= Math.cos(angle) * push;
           this.vy -= Math.sin(angle) * push;
        }

        // 3. Physics
        this.x += this.vx;
        this.y += this.vy;

        // 4. Friction (The "Eased" feel)
        this.vx *= this.friction;
        this.vy *= this.friction;

        // 5. Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        
        // Illumination: faster = brighter
        // Base opacity is very low (0.1), scales up to 0.7
        let opacity = 0.1 + Math.min(speed * 0.3, 0.6);
        
        ctx!.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx!.strokeStyle = `rgba(255, 255, 255, ${opacity})`;

        if (this.type === 'cross') {
           // Minimal cross shape
           const s = this.size; // small
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
                // Trail extends opposite to velocity
                ctx!.lineTo(this.x - this.vx * 2, this.y - this.vy * 2);
                ctx!.stroke();
            } else {
                // Static micro dot
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx!.fill();
            }
        }
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

      // 1. Clear background (Solid color to prevent trails, maintaining "Clean" look)
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
       // Move influence out of screen so particles drift naturally
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