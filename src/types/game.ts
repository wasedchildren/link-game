export interface Tile {
  id: string;
  icon: number;
  row: number;
  col: number;
  isMatched: boolean;
}

export interface MissionConfig {
  scoreTarget: number;
  comboTarget: number;
  rewardCoins: number;
}

export interface Level {
  id: number;
  chapterId: number;
  nameKey: string;
  rows: number;
  cols: number;
  pairs: number;
  timeLimit: number;
  mission: MissionConfig;
}

export interface Chapter {
  id: number;
  nameKey: string;
  themeKey: string;
  summaryKey: string;
  accentFrom: string;
  accentTo: string;
  mascotIcon: number;
}

export interface MissionProgress {
  reachedScoreTarget: boolean;
  reachedComboTarget: boolean;
  completedAll: boolean;
}

export interface LevelResultSummary {
  score: number;
  comboBest: number;
  coinsEarned: number;
  starsEarned: number;
  missionProgress: MissionProgress;
  timeLeft: number;
}

export interface GameState {
  currentLevel: number;
  coins: number;
  stars: number;
  unlockedLevels: number[];
  unlockedChapters: number[];
  tiles: Tile[];
  selectedTiles: Tile[];
  score: number;
  timeLeft: number;
  isPlaying: boolean;
  isPaused: boolean;
  matchedPairs: number;
  combo: number;
  comboBest: number;
  hintUsesLeft: number;
  shuffleUsesLeft: number;
  hintedTileIds: string[];
  levelResult: LevelResultSummary | null;
}

export type GameScene = 'menu' | 'tutorial' | 'level_select' | 'game' | 'result';
