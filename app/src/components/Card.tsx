'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'div' | 'button';
}

export default function Card({
  children,
  className = '',
  onClick,
  as = 'div'
}: CardProps) {
  const baseStyles = `
    bg-white
    rounded-2xl
    shadow-[0_2px_8px_rgba(0,0,0,0.08)]
  `;

  if (as === 'button' || onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseStyles} cursor-pointer transition-transform active:scale-[0.98] ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={`${baseStyles} ${className}`}>
      {children}
    </div>
  );
}
