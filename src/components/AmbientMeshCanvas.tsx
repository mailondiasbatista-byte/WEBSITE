import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  type: 'red' | 'neutral';
}

export function AmbientMeshCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isLight, theme, particlesEnabled, ambianceLevel } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';

  useEffect(() => {
    if (!particlesEnabled || ambianceLevel === 'minimal') {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Mouse coordinates tracking with smooth damping
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: ambianceLevel === 'maximum' ? 140 : 90,
      isActive: false,
    };

    // Responsive particle count based on screen size and ambiance level
    const particleCount =
      ambianceLevel === 'maximum'
        ? Math.min(Math.floor((width * height) / 14000), 65)
        : Math.min(Math.floor((width * height) / 22000), 35);

    const particles: Particle[] = [];

    const redColor = isLight ? '220, 38, 38' : '239, 68, 68';
    const violetColor = '108, 82, 238';
    const accentRgb = isRed ? redColor : violetColor;
    const neutralRgb = isLight ? '148, 163, 184' : '100, 116, 139';

    for (let i = 0; i < particleCount; i++) {
      const isAccent = Math.random() < (isRed ? 0.35 : 0.3);
      const baseR = Math.random() * 1.6 + 1.1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (ambianceLevel === 'maximum' ? 0.45 : 0.25),
        vy: (Math.random() - 0.5) * (ambianceLevel === 'maximum' ? 0.45 : 0.25),
        radius: baseR,
        baseRadius: baseR,
        color: isAccent ? accentRgb : neutralRgb,
        alpha: Math.random() * 0.35 + (isLight ? 0.15 : 0.2),
        type: isAccent ? 'red' : 'neutral',
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    let isDocumentVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const maxDistance = ambianceLevel === 'maximum' ? 120 : 90;

    const render = () => {
      if (!isDocumentVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce from boundaries smoothly
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > width) {
          p.x = width;
          p.vx *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > height) {
          p.y = height;
          p.vy *= -1;
        }

        // Mouse interaction: soft physics push
        if (mouse.isActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 1.6;
            p.y += Math.sin(angle) * force * 1.6;
            p.radius = p.baseRadius * (1 + force * 0.8);
          } else {
            p.radius += (p.baseRadius - p.radius) * 0.1;
          }
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.1;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();

        // Connect with other near particles with smooth alpha falloff
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * (isLight ? 0.14 : 0.18);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Red accent if either particle is red
            const isLineAccent = p.type === 'red' || p2.type === 'red';
            ctx.strokeStyle = `rgba(${isLineAccent ? accentRgb : neutralRgb}, ${lineAlpha})`;
            ctx.lineWidth = isLineAccent ? 0.8 : 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isLight, theme, particlesEnabled, ambianceLevel, isRed]);

  if (!particlesEnabled || ambianceLevel === 'minimal') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 ${className}`}
      style={{
        opacity: isLight ? 0.75 : 0.85,
      }}
    />
  );
}
