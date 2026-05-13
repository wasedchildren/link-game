export interface Tile {
  id: string;
  icon: string;
  row: number;
  col: number;
  isMatched: boolean;
}

export interface Level {
  id: number;
  name: string;
  rows: number;
  cols: number;
  pairs: number;
  timeLimit: number;
}

export interface GameState {
  currentLevel: number;
  coins: number;
  stars: number;
  unlockedLevels: number[];
  tiles: Tile[];
  selectedTiles: Tile[];
  score: number;
  timeLeft: number;
  isPlaying: boolean;
  isPaused: boolean;
  matchedPairs: number;
}

export type GameScene = 'menu' | 'level_select' | 'game' | 'result';
