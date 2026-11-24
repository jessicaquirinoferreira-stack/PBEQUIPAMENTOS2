import { type ButtonHTMLAttributes, type MouseEvent, type ReactNode, useRef, useState } from 'react';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function MagneticButton({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  ...rest
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, hover: false });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    setOffset({
      x: Math.max(-6, Math.min(6, dx * 0.14)),
      y: Math.max(-5, Math.min(5, dy * 0.14)),
    });
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      hover: true,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setGlow((prev) => ({ ...prev, hover: false }));
  };

  const baseStyles =
    variant === 'primary'
      ? 'bg-[#ff5500] text-white hover:bg-[#ff6a1a] shadow-[0_0_28px_-6px_rgba(255,85,0,0.55)] border border-[#ff7733]/40'
      : 'bg-zinc-900/80 text-zinc-100 hover:bg-zinc-800 border border-white/15 hover:border-[#ff5500]/50';

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)`,
        transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1), background-color 180ms ease, border-color 180ms ease',
      }}
      className={`relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-lg px-6 py-3.5 text-sm font-semibold whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5500] ${baseStyles} ${className}`}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: glow.hover ? 1 : 0,
          background:
            variant === 'primary'
              ? `radial-gradient(120px circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.22), transparent 70%)`
              : `radial-gradient(140px circle at ${glow.x}% ${glow.y}%, rgba(255,85,0,0.22), transparent 70%)`,
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
        {children}
      </span>
    </button>
  );
}
