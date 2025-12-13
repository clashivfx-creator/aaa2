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
      particleCount: window.innerWidth < 768 ? 50 : 100, // Balance performance vs visuals
      mouseRange: 160,
      obstaclePadding: 8, // Buffer around elements
      friction: 0.94,
      gravity: 0 // No gravity, just flow
    };

    // --- State ---
    const mouse = { x: -1000, y: -1000 };
    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    let scrollVelocity = 0;
    
    // UI Obstacles (Bounding Boxes in Viewport Coordinates)
    let obstacles: DOMRect[] = [];

    // --- Helper: Update Obstacles ---
    // Scans the DOM for elements that particles should collide with
    const updateObstacles = () => {
      // Select elements that feel "solid"
      const selectors = [
        '.glass-panel', 
        'button', 
        '.glass-card',
        'h1', 
        'h2',
        'nav'
      ];
      
      const elements = document.querySelectorAll(selectors.join(','));
      const newObstacles: DOMRect[] = [];

      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Optimization: Only track elements currently roughly on screen
        if (rect.bottom > -100 && rect.top < height + 100 && rect.width > 10 && rect.height > 10) {
          newObstacles.push(rect);
        }
      });
      obstacles = newObstacles;
    };

    // --- Classes ---

    // 1. Ambient Background Orbs (Atmosphere)
    class Orb {
      x: number; y: number; vx: number; vy: number;
      radius: number; color: string;
      
      constructor(hue: number) {
        this.radius = Math.min(width, height) * 0.7; // Large
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.1;
        this.vy = (Math.random() - 0.5) * 0.1;
        // Low saturation, high brightness, very transparent for "light through glass"
        this.color = `hsla(${hue}, 80%, 60%, 0.06)`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off walls (softly)
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
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // 2. Interactive Particles
    class Particle {
      x: number; y: number; vx: number; vy: number;
      size: number;
      baseHue: number;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1; // Micro dots
        // Assign a random base hue preference (Violet, Orange, Cyan ranges)
        const hues = [260, 30, 180];
        this.baseHue = hues[Math.floor(Math.random() * hues.length)] + (Math.random() * 40 - 20);
      }

      update() {
        // --- Forces ---

        // 1. Scroll Energy (Inject vertical velocity)
        // Damping the injection to prevent chaos
        if (Math.abs(scrollVelocity) > 0.1) {
            this.vy += scrollVelocity * 0.02;
        }

        // 2. Mouse/Touch Repulsion
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.mouseRange) {
           const force = (CONFIG.mouseRange - dist) / CONFIG.mouseRange;
           const angle = Math.atan2(dy, dx);
           const push = force * 0.5; // Gentle push
           
           this.vx -= Math.cos(angle) * push;
           this.vy -= Math.sin(angle) * push;
        }

        // --- Physics ---
        this.x += this.vx;
        this.y += this.vy;

        // Friction (The air resistance)
        this.vx *= CONFIG.friction;
        this.vy *= CONFIG.friction;

        // --- Collision with UI ---
        // Treat obstacles as solid boxes
        const p = CONFIG.obstaclePadding;
        
        // Only check collision if particle is moving enough to matter
        if (Math.abs(this.vx) > 0.01 || Math.abs(this.vy) > 0.01) {
            for (const rect of obstacles) {
                // Quick AABB check
                if (this.x > rect.left - p && this.x < rect.right + p && 
                    this.y > rect.top - p && this.y < rect.bottom + p) {
                    
                    // Determine overlap on each axis
                    const dl = Math.abs(this.x - rect.left);
                    const dr = Math.abs(this.x - rect.right);
                    const dt = Math.abs(this.y - rect.top);
                    const db = Math.abs(this.y - rect.bottom);
                    
                    const min = Math.min(dl, dr, dt, db);
                    
                    // Resolve collision: Push out and reflect velocity (bounce)
                    const bounceFactor = 0.6; // Lossy bounce
                    
                    if (min === dl) {
                        this.x = rect.left - p;
                        this.vx = -Math.abs(this.vx) * bounceFactor;
                    } else if (min === dr) {
                        this.x = rect.right + p;
                        this.vx = Math.abs(this.vx) * bounceFactor;
                    } else if (min === dt) {
                        this.y = rect.top - p;
                        this.vy = -Math.abs(this.vy) * bounceFactor;
                    } else {
                        this.y = rect.bottom + p;
                        this.vy = Math.abs(this.vy) * bounceFactor;
                    }
                }
            }
        }

        // --- Boundaries (Wrap) ---
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        
        // Color Logic:
        // Still = White/Gray
        // Moving = Colored + Glowing
        const moveThreshold = 0.3;
        
        let color = 'rgba(255, 255, 255, 0.2)'; // Default idle
        let glow = false;

        if (speed > moveThreshold) {
            // Interpolate color intensity based on speed
            const intensity = Math.min((speed - moveThreshold) * 0.5, 1); // 0 to 1
            const sat = 50 + intensity * 50; // 50% to 100%
            const light = 90 - intensity * 40; // 90% to 50%
            const alpha = 0.3 + intensity * 0.7;
            
            color = `hsla(${this.baseHue}, ${sat}%, ${light}%, ${alpha})`;
            glow = true;
        }

        ctx!.fillStyle = color;
        ctx!.strokeStyle = color;

        if (glow) {
            // Add soft glow
            // Note: shadowBlur is expensive, so we use it sparingly or fake it
            ctx!.shadowBlur = 15;
            ctx!.shadowColor = color;
        } else {
            ctx!.shadowBlur = 0;
        }

        if (speed > 2) {
            // Stretch effect for high speed
            ctx!.lineWidth = this.size;
            ctx!.beginPath();
            ctx!.moveTo(this.x, this.y);
            ctx!.lineTo(this.x - this.vx * 2, this.y - this.vy * 2);
            ctx!.stroke();
        } else {
            // Dot
            ctx!.beginPath();
            ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx!.fill();
        }
        
        // Reset shadow
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
        new Orb(270), // Violet
        new Orb(30),  // Orange
        new Orb(180)  // Cyan
      ];

      particles = [];
      for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle());
      }
      
      // Initial obstacle detection
      updateObstacles();
    };

    // --- Animation Loop ---
    const animate = () => {
      if (!ctx) return;
      
      // Clear with Base Color (No trails, clean look)
      ctx.fillStyle = CONFIG.baseColor;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Atmospheric Layer
      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });

      // 2. Draw Particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Decay scroll velocity
      scrollVelocity *= 0.9;
      
      requestAnimationFrame(animate);
    };

    // --- Event Listeners ---
    
    // Update obstacles on scroll because their viewport position changes
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      
      // Critical: Update obstacles position relative to viewport
      updateObstacles();
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    };
    
    const handleTouchEnd = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    
    // Also run obstacle update periodically to catch layout shifts (lazy load etc)
    const intervalId = setInterval(updateObstacles, 1000);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[#050505]" 
    />
  );
};