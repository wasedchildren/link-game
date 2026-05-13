import { create } from 'zustand';
import type { Tile, GameScene } from '@/types/game';
import { LEVELS, GAME_CONFIG, generateTiles, canConnect } from '@/game/config/GameConfig';

interface GameStore {
  scene: GameScene;
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
  rows: number;
  cols: number;
  
  setScene: (scene: GameScene) => void;
  setCurrentLevel: (level: number) => void;
  selectTile: (tile: Tile) => void;
  clearSelection: () => void;
  matchTiles: () => boolean;
  startLevel: (levelId: number) => void;
  nextLevel: () => void;
  resetGame: () => void;
  updateTime: () => void;
  togglePause: () => void;
}

const getSavedData = () => {
  const saved = localStorage.getItem('linkup_save');
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    coins: GAME_CONFIG.baseCoins,
    stars: 0,
    unlockedLevels: [1],
  };
};

const saveData = (data: { coins: number; stars: number; unlockedLevels: number[] }) => {
  localStorage.setItem('linkup_save', JSON.stringify(data));
};

export const useGameStore = create<GameStore>((set, get) => {
  const saved = getSavedData();
  
  return {
    scene: 'menu',
    currentLevel: 1,
    coins: saved.coins,
    stars: saved.stars,
    unlockedLevels: saved.unlockedLevels,
    tiles: [],
    selectedTiles: [],
    score: 0,
    timeLeft: 0,
    isPlaying: false,
    isPaused: false,
    matchedPairs: 0,
    rows: 4,
    cols: 4,
    
    setScene: (scene) => set({ scene }),
    
    setCurrentLevel: (level) => set({ currentLevel: level }),
    
    selectTile: (tile) => {
      const { selectedTiles, tiles, rows, cols } = get();
      
      if (tile.isMatched) return;
      
      const alreadySelected = selectedTiles.find(t => t.id === tile.id);
      if (alreadySelected) {
        set({ selectedTiles: selectedTiles.filter(t => t.id !== tile.id) });
        return;
      }
      
      if (selectedTiles.length === 1) {
        const [firstTile] = selectedTiles;
        
        if (canConnect(firstTile, tile, tiles, rows, cols)) {
          const newSelected = [...selectedTiles, tile];
          set({ selectedTiles: newSelected });
          setTimeout(() => {
            get().matchTiles();
          }, 300);
        } else {
          set({ selectedTiles: [tile] });
        }
      } else {
        set({ selectedTiles: [tile] });
      }
    },
    
    clearSelection: () => set({ selectedTiles: [] }),
    
    matchTiles: () => {
      const { selectedTiles, tiles, currentLevel, matchedPairs } = get();
      
      if (selectedTiles.length !== 2) return false;
      
      const [tile1, tile2] = selectedTiles;
      
      if (tile1.icon === tile2.icon) {
        const newTiles = tiles.map(t => 
          t.id === tile1.id || t.id === tile2.id 
            ? { ...t, isMatched: true }
            : t
        );
        
        const level = LEVELS.find(l => l.id === currentLevel);
        const newMatchedPairs = matchedPairs + 1;
        
        set(state => {
          const newScore = state.score + 100;
          
          if (level && newMatchedPairs >= level.pairs) {
            const timeBonus = state.timeLeft * GAME_CONFIG.timeBonus;
            const finalScore = newScore + timeBonus;
            const newCoins = state.coins + GAME_CONFIG.coinsPerLevel;
            const newStars = state.stars + GAME_CONFIG.starsPerLevel;
            const nextLevelId = currentLevel + 1;
            let newUnlockedLevels = state.unlockedLevels;
            
            if (nextLevelId <= LEVELS.length && !state.unlockedLevels.includes(nextLevelId)) {
              newUnlockedLevels = [...state.unlockedLevels, nextLevelId];
            }
            
            saveData({ coins: newCoins, stars: newStars, unlockedLevels: newUnlockedLevels });
            
            return {
              tiles: newTiles,
              selectedTiles: [],
              score: finalScore,
              matchedPairs: newMatchedPairs,
              coins: newCoins,
              stars: newStars,
              unlockedLevels: newUnlockedLevels,
              isPlaying: false,
              scene: 'result',
            };
          }
          
          return {
            tiles: newTiles,
            selectedTiles: [],
            score: newScore,
            matchedPairs: newMatchedPairs,
          };
        });
        
        return true;
      }
      
      set({ selectedTiles: [] });
      return false;
    },
    
    startLevel: (levelId) => {
      const level = LEVELS.find(l => l.id === levelId);
      if (level) {
        set({
          currentLevel: levelId,
          tiles: generateTiles(level),
          selectedTiles: [],
          score: 0,
          timeLeft: level.timeLimit,
          isPlaying: true,
          isPaused: false,
          matchedPairs: 0,
          rows: level.rows,
          cols: level.cols,
          scene: 'game',
        });
      }
    },
    
    nextLevel: () => {
      const { currentLevel } = get();
      const nextLevelId = currentLevel + 1;
      if (nextLevelId <= LEVELS.length) {
        get().startLevel(nextLevelId);
      }
    },
    
    resetGame: () => {
      set({
        currentLevel: 1,
        tiles: [],
        selectedTiles: [],
        score: 0,
        timeLeft: 0,
        isPlaying: false,
        isPaused: false,
        matchedPairs: 0,
      });
    },
    
    updateTime: () => {
      set(state => {
        if (state.timeLeft <= 0) {
          return {
            timeLeft: 0,
            isPlaying: false,
            scene: 'result',
          };
        }
        return { timeLeft: state.timeLeft - 1 };
      });
    },
    
    togglePause: () => {
      set(state => ({ isPaused: !state.isPaused }));
    },
  };
});
