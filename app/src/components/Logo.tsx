'use client';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Logo({ size = 'medium', className = '' }: LogoProps) {
  const sizes = {
    small: { width: 40, height: 24 },
    medium: { width: 60, height: 36 },
    large: { width: 80, height: 48 },
  };

  const { width, height } = sizes[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Linker Berg (kleiner, hinten) */}
      <polygon
        points="0,48 25,12 50,48"
        fill="black"
      />
      {/* Rechter Berg (größer, vorne) */}
      <polygon
        points="30,48 55,8 80,48"
        fill="black"
      />
    </svg>
  );
}
