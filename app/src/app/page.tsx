'use client';

import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import Card from '@/components/Card';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8">
      {/* Logo */}
      <Card className="w-full max-w-[280px] py-12 flex items-center justify-center">
        <Logo size="large" />
      </Card>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-[280px]">
        <Card
          as="button"
          onClick={() => router.push('/categories')}
          className="w-full py-8 text-xl font-medium"
        >
          Select Categorie
        </Card>

        <Card
          as="button"
          onClick={() => router.push(`/game?random=true&t=${Date.now()}`)}
          className="w-full py-8 text-xl font-medium"
        >
          Start Random
        </Card>
      </div>
    </div>
  );
}
