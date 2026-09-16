import React from 'react';

interface BrandLogoProps {
  className?: string;
  imgClassName?: string;
  variant?: 'light' | 'dark' | 'color';
  division?: 'DIGITALS' | 'TECHNOLOGIES' | 'MAIN' | 'NONE';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  imgClassName = '',
  variant = 'light', // 'light' means for light backgrounds, 'dark' means for dark backgrounds
  division = 'MAIN',
  size = 'md',
  showTagline = false,
}) => {
  const isDarkBg = variant === 'dark';

  // Height and max-width scaling calibrated for the official Crivorra Digitals logo
  const sizeClasses = {
    sm: 'h-9 sm:h-10 max-w-[130px]',
    md: 'h-13 sm:h-15 md:h-16 max-w-[190px]',
    lg: 'h-18 sm:h-22 max-w-[260px]',
    xl: 'h-26 sm:h-30 max-w-[340px]',
  }[size];

  const taglineSizeClasses = {
    sm: 'text-[8px]',
    md: 'text-[9px]',
    lg: 'text-[10px]',
    xl: 'text-xs',
  }[size];

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <div className="flex items-center gap-2">
        <img
          src="/Crivorra Digitals.png"
          alt="CRIVORRA DIGITALS"
          className={`${imgClassName ? imgClassName : sizeClasses} w-auto object-contain transition-transform duration-300 hover:scale-105 drop-shadow-xs`}
          loading="eager"
          decoding="async"
        />
        {division === 'TECHNOLOGIES' && (
          <span className="font-mono-code text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#7928CA]/10 text-[#7928CA] border border-[#7928CA]/20">
            TECHNOLOGIES
          </span>
        )}
      </div>

      {showTagline && (
        <span
          className={`font-mono-code tracking-widest uppercase font-semibold mt-1.5 ${taglineSizeClasses} ${
            isDarkBg ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          DIGITAL GROWTH • AI • TECHNOLOGY
        </span>
      )}
    </div>
  );
};
