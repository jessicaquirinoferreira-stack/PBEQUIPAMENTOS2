import { useState } from 'react';

interface BrandLogoProps {
  variant?: 'header' | 'hero' | 'full';
  className?: string;
}

const OFFICIAL_LOGO_SRC = '/images/logo-pb-equipamentos.png';

export function BrandLogo({ variant = 'header', className = '' }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses =
    variant === 'header'
      ? 'h-10 sm:h-11 w-auto'
      : variant === 'hero'
        ? 'h-20 sm:h-24 w-auto'
        : 'h-20 sm:h-24 w-auto';

  if (imgError) {
    return (
      <span className={`inline-flex items-center gap-2 whitespace-nowrap shrink-0 ${className}`}>
        <span className="font-display text-lg font-bold tracking-tight text-white">
          P.B. <span className="text-[#ff5500]">Equipamentos</span>
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center bg-transparent whitespace-nowrap shrink-0 ${className}`}>
      <img
        src={OFFICIAL_LOGO_SRC}
        alt="P.B. Equipamentos de Locação"
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`${sizeClasses} bg-transparent object-contain select-none`}
      />
    </span>
  );
}
