'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import './Logo.scss';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo = memo(function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = { sm: 100, md: 160, lg: 220 };
  const w = sizes?.[size] ?? 160;

  return (
    <div className={`logo logo--${size} ${className}`}>
      <Image
        src="/logo.png"
        alt="TIVIT Almaviva Group"
        width={w}
        height={Math.round(w * 0.35)}
        priority
      />
    </div>
  );
});

export default Logo;
