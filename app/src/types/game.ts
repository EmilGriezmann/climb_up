export interface Item {
  id: string;
  name: string;
  rank: number; // 1 = höchster/bester, 11 = niedrigster/schlechtester
}

export interface Round {
  id: string;
  question: string; // z.B. "Which is the least populated?"
  items: Item[];
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  rounds: Round[];
}

export interface GameState {
  currentTeam: 'red' | 'blue';
  scores: {
    red: number;
    blue: number;
  };
  remainingItems: Item[];
  selectedItem: Item | null;
  gameOver: boolean;
  winner: 'red' | 'blue' | null;
  lastResult: 'correct' | 'partial' | 'gameover' | null;
}
