'use client';

import { useRouter } from 'next/navigation';
import Card from './Card';

interface BackButtonProps {
  href?: string;
}

export default function BackButton({ href }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Card
      as="button"
      onClick={handleBack}
      className="w-12 h-12 flex items-center justify-center"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Card>
  );
}
