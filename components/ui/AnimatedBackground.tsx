import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Configuration for the VFX Field
    const CONFIG = {
      bg: '#0b0b0b',
      particleColor: 'rgba(255, 255, 255, 0.8)',
      lineColor: 'rgba(255, 255, 255, 0.04)',
      accentColor: 'rgba(0, 255, 255, 0.3)', // Subtle cyan accent for kinetic energy
      connectionDist: 110,
      mouseRange: 180,
    };

    // Physics State
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      type: 'dot' | 'cross';

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() > 0.9 ? 1.5 : 0.8; // Micro dots
        this.type = Math.random() > 0.85 ? 'cross' : 'dot'; // Occasional trackers
      }

      update() {
        // Integrate velocity
        this.x += this.vx;
        this.y += this.vy;

        // Friction (Damping)
        this.vx *= 0.96;
        this.vy *= 0.96;

        // Interaction: Mouse/Touch Repel & Flow
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.mouseRange) {
          const force = (CONFIG.mouseRange - dist) / CONFIG.mouseRange;
          const angle = Math.atan2(dy, dx);
          const push = force * 0.4; // Subtle push
          
          this.vx -= Math.cos(angle) * push;
          this.vy -= Math.sin(angle) * push;
        }

        // Interaction: Scroll Vertical Force
        this.y -= scrollSpeed * 0.3;

        // Boundaries: Wrap around
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        
        // Calculate energy for color/opacity
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const opacity = 0.2 + Math.min(speed * 0.5, 0.6);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        
        if (this.type === 'cross') {
           // Draw VFX tracker cross
           const s = this.size * 2.5;
           ctx.strokeStyle = ctx.fillStyle;
           ctx.lineWidth = 0.5;
           ctx.beginPath();
           ctx.moveTo(this.x - s, this.y);
           ctx.lineTo(this.x + s, this.y);
           ctx.moveTo(this.x, this.y - s);
           ctx.lineTo(this.x, this.y + s);
           ctx.stroke();
        } else {
           // Draw micro dot
           ctx.beginPath();
           ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
           ctx.fill();
        }
      }
    }

    const init = () => {
      particles = [];
      const density = window.innerWidth < 768 ? 80 : 130; // Mobile vs Desktop density
      for (let i = 0; i < density; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Update and Draw Particles
      particles.forEach((p, i) => {
        p.update();
        p.draw();

        // Draw connections (Network/Plexus effect)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONFIG.connectionDist) {
            ctx.beginPath();
            const opacity = 1 - (dist / CONFIG.connectionDist);
            
            // Kinetic energy accent
            const energy = Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(p2.vx) + Math.abs(p2.vy);
            
            if (energy > 2) {
                // Subtle accent color when moving fast (swipe/burst)
                ctx.strokeStyle = CONFIG.accentColor.replace('0.3', `${opacity * 0.4}`);
            } else {
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.08})`;
            }

            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      // Scroll damping
      scrollSpeed *= 0.92;
      
      requestAnimationFrame(animate);
    };

    // Event Handlers
    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onScroll = () => {
      const y = window.scrollY;
      scrollSpeed = y - lastScrollY;
      lastScrollY = y;
    };

    // Touch Logic (Mobile)
    const onTouchStart = (e: TouchEvent) => {
        const t = e.touches[0];
        mouse.x = t.clientX;
        mouse.y = t.clientY;
        
        // Tap Burst Effect
        particles.forEach(p => {
             const dx = p.x - t.clientX;
             const dy = p.y - t.clientY;
             const dist = Math.sqrt(dx*dx + dy*dy);
             if (dist < 200) {
                 const angle = Math.atan2(dy, dx);
                 const force = (200 - dist) / 40; // Strong impulse
                 p.vx += Math.cos(angle) * force;
                 p.vy += Math.sin(angle) * force;
             }
        });
    };

    const onTouchMove = (e: TouchEvent) => {
        const t = e.touches[0];
        const dx = t.clientX - mouse.x;
        const dy = t.clientY - mouse.y;
        mouse.x = t.clientX;
        mouse.y = t.clientY;
        
        // Directional kinetic swipe
        particles.forEach(p => {
             const pdx = p.x - t.clientX;
             const pdy = p.y - t.clientY;
             const dist = Math.sqrt(pdx*pdx + pdy*pdy);
             if (dist < 150) {
                 p.vx += dx * 0.08;
                 p.vy += dy * 0.08;
             }
        });
    };

    const onTouchEnd = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    };

    // Register Listeners
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[#0b0b0b]" 
    />
  );
};