import { Category, Round } from '@/types/game';
import { geographyRounds } from './geography';
import { animalsRounds } from './animals';
import { cultureRounds } from './culture';
import { sportsRounds } from './sports';
import { historyRounds } from './history';
import { businessRounds } from './business';

export const categories: Category[] = [
  {
    id: 'geography',
    name: 'Geography',
    emoji: '🌍',
    rounds: geographyRounds,
  },
  {
    id: 'animals',
    name: 'Animals',
    emoji: '🐵',
    rounds: animalsRounds,
  },
  {
    id: 'culture',
    name: 'Culture',
    emoji: '🎭',
    rounds: cultureRounds,
  },
  {
    id: 'sports',
    name: 'Sports',
    emoji: '⚽',
    rounds: sportsRounds,
  },
  {
    id: 'history',
    name: 'History',
    emoji: '📖',
    rounds: historyRounds,
  },
  {
    id: 'business',
    name: 'Business & Tech',
    emoji: '📈',
    rounds: businessRounds,
  },
];

export function getRandomRound(): { category: Category; round: Round } {
  const allRounds: { category: Category; round: Round }[] = [];

  for (const category of categories) {
    for (const round of category.rounds) {
      allRounds.push({ category, round });
    }
  }

  const randomIndex = Math.floor(Math.random() * allRounds.length);
  return allRounds[randomIndex];
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getRandomRoundFromCategory(categoryId: string): Round | undefined {
  const category = getCategoryById(categoryId);
  if (!category || category.rounds.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * category.rounds.length);
  return category.rounds[randomIndex];
}
