import React, { useRef, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderColor?: string;
  spotlightRadius?: number;
}

export function SpotlightCard({
  children,
  className = '',
  glowColor,
  borderColor,
  spotlightRadius = 380,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const { isLight, theme, spotlightEnabled } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';

  const defaultGlow = isRed
    ? isLight
      ? 'rgba(220, 38, 38, 0.08)'
      : 'rgba(239, 68, 68, 0.12)'
    : 'rgba(99, 79, 237, 0.14)';

  const defaultBorderGlow = isRed
    ? isLight
      ? 'rgba(220, 38, 38, 0.35)'
      : 'rgba(239, 68, 68, 0.45)'
    : 'rgba(114, 98, 246, 0.45)';

  const activeGlow = glowColor || defaultGlow;
  const activeBorderGlow = borderColor || defaultBorderGlow;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  if (!spotlightEnabled) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Background Spotlight Radial Gradient */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out z-10 rounded-[inherit]"
        style={{
          opacity,
          background: `radial-gradient(${spotlightRadius}px circle at ${position.x}px ${position.y}px, ${activeGlow}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Dynamic Border Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out z-20 rounded-[inherit]"
        style={{
          opacity,
          background: `radial-gradient(${spotlightRadius * 0.75}px circle at ${position.x}px ${position.y}px, ${activeBorderGlow}, transparent 70%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
        aria-hidden="true"
      />

      {children}
    </div>
  );
}
