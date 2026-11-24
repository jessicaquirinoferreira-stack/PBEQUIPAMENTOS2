import { type MouseEvent, type ReactNode, useRef, useState } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTiltDeg?: number;
}

export function TiltCard({
  children,
  className = '',
  maxTiltDeg = 5,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
  );
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    const rotateY = (relX - 0.5) * maxTiltDeg * 2;
    const rotateX = (0.5 - relY) * maxTiltDeg * 2;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`,
    );
    setSpotPos({
      x: Math.round(relX * 100),
      y: Math.round(relY * 100),
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle(
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    );
    setSpotPos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: spotPos.active ? 1 : 0,
          background: `radial-gradient(420px circle at ${spotPos.x}% ${spotPos.y}%, rgba(255, 85, 0, 0.14), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
