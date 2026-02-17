'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import Card from '@/components/Card';
import BackButton from '@/components/BackButton';
import { categories } from '@/data/categories';

export default function CategoriesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleStart = () => {
    if (selectedCategory) {
      router.push(`/game?category=${selectedCategory}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 gap-6">
      {/* Header mit Back-Button und Logo */}
      <div className="flex items-center gap-3 w-full max-w-[280px]">
        <BackButton href="/" />
        <Card className="flex-1 py-6 flex items-center justify-center">
          <Logo size="medium" />
        </Card>
      </div>

      {/* Kategorie-Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-[280px]">
        {categories.map((category) => (
          <Card
            key={category.id}
            as="button"
            onClick={() => setSelectedCategory(category.id)}
            className={`
              aspect-square flex items-center justify-center text-4xl
              transition-all duration-200
              ${selectedCategory === category.id
                ? 'ring-2 ring-black scale-105'
                : ''
              }
            `}
          >
            {category.emoji}
          </Card>
        ))}
      </div>

      {/* Start Button */}
      <Card
        as="button"
        onClick={handleStart}
        className={`
          w-full max-w-[280px] py-6 text-xl font-medium
          transition-opacity duration-200
          ${selectedCategory ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}
        `}
      >
        Start
      </Card>
    </div>
  );
}
