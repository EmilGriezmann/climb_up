'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import Card from '@/components/Card';
import BackButton from '@/components/BackButton';
import { getRandomRound, getCategoryById, getRandomRoundFromCategory } from '@/data/categories';
import { Item, Category, Round, GameState } from '@/types/game';

function GameContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [category, setCategory] = useState<Category | null>(null);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentTeam: 'red',
    scores: { red: 0, blue: 0 },
    remainingItems: [],
    selectedItem: null,
    gameOver: false,
    winner: null,
    lastResult: null,
  });
  const [showResult, setShowResult] = useState(false);
  const [lastSelectedItem, setLastSelectedItem] = useState<Item | null>(null);
  const [resultType, setResultType] = useState<'correct' | 'partial' | 'gameover' | null>(null);
  const [isRandom, setIsRandom] = useState(false);

  useEffect(() => {
    const random = searchParams.get('random') === 'true';
    const categoryId = searchParams.get('category');
    setIsRandom(random);

    let selectedCategory: Category;
    let selectedRound: Round;

    if (random) {
      const randomResult = getRandomRound();
      selectedCategory = randomResult.category;
      selectedRound = randomResult.round;
    } else if (categoryId) {
      const found = getCategoryById(categoryId);
      if (!found) {
        router.push('/');
        return;
      }
      selectedCategory = found;
      const round = getRandomRoundFromCategory(categoryId);
      if (!round) {
        router.push('/');
        return;
      }
      selectedRound = round;
    } else {
      router.push('/');
      return;
    }

    setCategory(selectedCategory);
    setCurrentRound(selectedRound);

    const shuffledItems = [...selectedRound.items].sort(() => Math.random() - 0.5);

    setGameState({
      currentTeam: 'red',
      scores: { red: 0, blue: 0 },
      remainingItems: shuffledItems,
      selectedItem: null,
      gameOver: false,
      winner: null,
      lastResult: null,
    });
  }, [searchParams, router]);

  const handleItemSelect = useCallback((item: Item) => {
    if (gameState.gameOver || showResult) return;

    const remaining = gameState.remainingItems;
    const lowestRank = Math.max(...remaining.map(i => i.rank));
    const isLowest = item.rank === lowestRank;
    const isFirst = item.rank === 1;

    let points = 0;
    let result: 'correct' | 'partial' | 'gameover';

    if (isFirst) {
      result = 'gameover';
    } else if (isLowest) {
      points = 2;
      result = 'correct';
    } else {
      points = 1;
      result = 'partial';
    }

    setLastSelectedItem(item);
    setResultType(result);
    setShowResult(true);

    setTimeout(() => {
      if (result === 'gameover') {
        const winner = gameState.currentTeam === 'red' ? 'blue' : 'red';
        setGameState(prev => ({
          ...prev,
          gameOver: true,
          winner,
          lastResult: result,
        }));
      } else {
        const newRemaining = remaining.filter(i => i.id !== item.id);

        if (newRemaining.length === 1) {
          const redTotal = gameState.scores.red + (gameState.currentTeam === 'red' ? points : 0);
          const blueTotal = gameState.scores.blue + (gameState.currentTeam === 'blue' ? points : 0);
          const winner = redTotal > blueTotal ? 'red' : blueTotal > redTotal ? 'blue' : 'red';

          setGameState(prev => ({
            ...prev,
            scores: {
              red: prev.currentTeam === 'red' ? prev.scores.red + points : prev.scores.red,
              blue: prev.currentTeam === 'blue' ? prev.scores.blue + points : prev.scores.blue,
            },
            remainingItems: newRemaining,
            gameOver: true,
            winner,
            lastResult: result,
          }));
        } else {
          setGameState(prev => ({
            ...prev,
            scores: {
              red: prev.currentTeam === 'red' ? prev.scores.red + points : prev.scores.red,
              blue: prev.currentTeam === 'blue' ? prev.scores.blue + points : prev.scores.blue,
            },
            remainingItems: newRemaining,
            currentTeam: prev.currentTeam === 'red' ? 'blue' : 'red',
            lastResult: result,
          }));
        }
      }

      setShowResult(false);
      setLastSelectedItem(null);
      setResultType(null);
    }, 1500);
  }, [gameState, showResult]);

  const renderItem = (item: Item) => {
    const isSelected = lastSelectedItem?.id === item.id;
    let borderColor = '';
    let textColor = '';
    let bgColor = '';

    if (isSelected && showResult) {
      if (resultType === 'correct') {
        borderColor = 'ring-2 ring-green-400';
        textColor = 'text-green-600';
      } else if (resultType === 'partial') {
        borderColor = 'ring-2 ring-yellow-400';
        textColor = 'text-yellow-600';
      } else if (resultType === 'gameover') {
        borderColor = 'ring-2 ring-red-500';
        textColor = 'text-red-600';
        bgColor = 'bg-red-50';
      }
    }

    return (
      <Card
        key={item.id}
        as="button"
        onClick={() => handleItemSelect(item)}
        className={`
          py-4 px-3 text-center font-medium
          ${borderColor}
          ${bgColor}
          ${showResult && !isSelected ? 'opacity-50' : ''}
        `}
      >
        <span className={textColor}>
          {isSelected && showResult && resultType !== 'gameover' && (
            <span className="text-sm">{item.rank}. </span>
          )}
          {isSelected && showResult && resultType === 'gameover' && (
            <span className="text-sm">1. </span>
          )}
          {item.name}
        </span>
      </Card>
    );
  };

  if (!category || !currentRound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (gameState.gameOver) {
    const winnerColor = gameState.winner === 'blue' ? 'text-blue-500' : 'text-red-500';
    const winnerBg = gameState.winner === 'blue' ? 'from-blue-500/20 to-blue-500/5' : 'from-red-500/20 to-red-500/5';

    return (
      <div className="min-h-screen flex flex-col items-center p-4 gap-4">
        {/* Header */}
        <div className="flex items-center gap-3 w-full max-w-[320px]">
          <BackButton href="/" />
          <Card className="p-3">
            <Logo size="small" />
          </Card>
          <div className="flex-1" />
          <Card className="px-4 py-3 bg-red-500/10">
            <span className="text-xl font-bold text-red-500">{gameState.scores.red}</span>
          </Card>
          <Card className="px-4 py-3 bg-blue-500/10">
            <span className="text-xl font-bold text-blue-500">{gameState.scores.blue}</span>
          </Card>
        </div>

        {/* Question */}
        <Card className="w-full max-w-[320px] py-4 px-6 text-center">
          <p className="text-lg font-medium">{currentRound.question}</p>
        </Card>

        {/* Winner Card */}
        <Card className={`w-full max-w-[320px] py-16 px-6 text-center bg-gradient-to-b ${winnerBg}`}>
          <h2 className={`text-4xl font-bold ${winnerColor} animate-pulse`}>
            {gameState.winner === 'blue' ? 'Blue' : 'Red'} Wins!
          </h2>
          <p className="text-3xl mt-4 font-bold">
            <span className={gameState.winner === 'blue' ? 'text-blue-500' : 'text-gray-400'}>
              {gameState.scores.blue}
            </span>
            <span className="text-gray-300 mx-2">-</span>
            <span className={gameState.winner === 'red' ? 'text-red-500' : 'text-gray-400'}>
              {gameState.scores.red}
            </span>
          </p>
        </Card>

        {/* Play Again */}
        <Card
          as="button"
          onClick={() => router.push('/')}
          className="w-full max-w-[320px] py-4 text-lg font-medium"
        >
          Play Again
        </Card>
      </div>
    );
  }

  // Teile Items in Grid-Items und letztes Item (wenn ungerade)
  const isOdd = gameState.remainingItems.length % 2 === 1;
  const gridItems = isOdd
    ? gameState.remainingItems.slice(0, -1)
    : gameState.remainingItems;
  const lastItem = isOdd
    ? gameState.remainingItems[gameState.remainingItems.length - 1]
    : null;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 gap-4">
      {/* Header */}
      <div className="flex items-center gap-3 w-full max-w-[320px]">
        <BackButton href={isRandom ? '/' : '/categories'} />
        <Card className="p-3">
          <Logo size="small" />
        </Card>
        <div className="flex-1" />
        <Card className={`px-4 py-3 bg-red-500/10 ${gameState.currentTeam === 'red' ? 'ring-2 ring-red-400' : ''}`}>
          <span className="text-xl font-bold text-red-500">{gameState.scores.red}</span>
        </Card>
        <Card className={`px-4 py-3 bg-blue-500/10 ${gameState.currentTeam === 'blue' ? 'ring-2 ring-blue-400' : ''}`}>
          <span className="text-xl font-bold text-blue-500">{gameState.scores.blue}</span>
        </Card>
      </div>

      {/* Question */}
      <Card className="w-full max-w-[320px] py-4 px-6 text-center">
        <p className="text-lg font-medium">{currentRound.question}</p>
      </Card>

      {/* Items Grid (gerade Anzahl) */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-[320px]">
        {gridItems.map(renderItem)}
      </div>

      {/* Letztes Item zentriert (wenn ungerade) */}
      {lastItem && (
        <div className="w-full max-w-[320px] flex justify-center">
          <div className="w-[calc(50%-6px)]">
            {renderItem(lastItem)}
          </div>
        </div>
      )}
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <GameContent />
    </Suspense>
  );
}
