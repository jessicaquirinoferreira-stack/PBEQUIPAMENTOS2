import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
}

export function ParticleEmbers() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const count = Math.min(36, Math.max(18, Math.floor(width / 42)));
    const createParticle = (initial = false): Particle => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 10,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(0.22 + Math.random() * 0.45),
      radius: 1 + Math.random() * 1.8,
      alpha: 0.15 + Math.random() * 0.55,
      decay: 0.0007 + Math.random() * 0.0012,
    });

    const particles: Particle[] = Array.from({ length: count }, () => createParticle(true));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y < -12) {
          particles[i] = createParticle(false);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 95, 20, ${p.alpha.toFixed(3)})`;
        ctx.fill();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-75"
    />
  );
}
