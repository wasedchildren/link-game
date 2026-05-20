import { create } from 'zustand';
import type { GameScene, LevelResultSummary, Tile } from '@/types/game';
import {
  CHAPTERS,
  GAME_CONFIG,
  LEVELS,
  canConnect,
  findHintPair,
  generateTiles,
  shuffleUnmatchedTiles,
} from '@/game/config/GameConfig';

interface GameStore {
  scene: GameScene;
  currentLevel: number;
  coins: number;
  stars: number;
  bgmEnabled: boolean;
  unlockedLevels: number[];
  unlockedChapters: number[];
  tiles: Tile[];
  selectedTiles: Tile[];
  score: number;
  timeLeft: number;
  isPlaying: boolean;
  isPaused: boolean;
  matchedPairs: number;
  rows: number;
  cols: number;
  combo: number;
  comboBest: number;
  hintUsesLeft: number;
  shuffleUsesLeft: number;
  hintedTileIds: string[];
  lastMatchTimestamp: number | null;
  levelResult: LevelResultSummary | null;
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
  toggleBgm: () => void;
  triggerHint: () => void;
  triggerShuffle: () => void;
}

const getSavedData = () => {
  const saved = localStorage.getItem('linkup_save');
  if (saved) {
    return JSON.parse(saved);
  }

  return {
    coins: GAME_CONFIG.baseCoins,
    stars: 0,
    bgmEnabled: true,
    unlockedLevels: [1],
    unlockedChapters: [1],
  };
};

const saveData = (data: {
  coins: number;
  stars: number;
  unlockedLevels: number[];
  unlockedChapters: number[];
  bgmEnabled: boolean;
}) => {
  localStorage.setItem('linkup_save', JSON.stringify(data));
};

export const useGameStore = create<GameStore>((set, get) => {
  const saved = getSavedData();

  return {
    scene: 'menu',
    currentLevel: 1,
    coins: saved.coins,
    stars: saved.stars,
    bgmEnabled: typeof saved.bgmEnabled === 'boolean' ? saved.bgmEnabled : true,
    unlockedLevels: Array.isArray(saved.unlockedLevels) ? saved.unlockedLevels : [1],
    unlockedChapters:
      Array.isArray(saved.unlockedChapters) && saved.unlockedChapters.length > 0
        ? saved.unlockedChapters
        : [1],
    tiles: [],
    selectedTiles: [],
    score: 0,
    timeLeft: 0,
    isPlaying: false,
    isPaused: false,
    matchedPairs: 0,
    rows: 4,
    cols: 4,
    combo: 0,
    comboBest: 0,
    hintUsesLeft: GAME_CONFIG.defaultHints,
    shuffleUsesLeft: GAME_CONFIG.defaultShuffles,
    hintedTileIds: [],
    lastMatchTimestamp: null,
    levelResult: null,

    setScene: (scene) => set({ scene }),

    setCurrentLevel: (level) => set({ currentLevel: level }),

    selectTile: (tile) => {
      const { selectedTiles, tiles, rows, cols } = get();

      if (tile.isMatched) return;

      const alreadySelected = selectedTiles.find((item) => item.id === tile.id);
      if (alreadySelected) {
        set({ selectedTiles: selectedTiles.filter((item) => item.id !== tile.id) });
        return;
      }

      if (selectedTiles.length === 1) {
        const [firstTile] = selectedTiles;

        if (canConnect(firstTile, tile, tiles, rows, cols)) {
          const newSelected = [...selectedTiles, tile];
          set({ selectedTiles: newSelected });
          window.setTimeout(() => {
            get().matchTiles();
          }, 300);
        } else {
          set({ selectedTiles: [tile], combo: 0 });
        }
      } else {
        set({ selectedTiles: [tile] });
      }
    },

    clearSelection: () => set({ selectedTiles: [] }),

    matchTiles: () => {
      const { selectedTiles, tiles, currentLevel, matchedPairs, lastMatchTimestamp } = get();

      if (selectedTiles.length !== 2) return false;

      const [tile1, tile2] = selectedTiles;

      if (tile1.icon === tile2.icon) {
        const now = Date.now();
        const currentCombo = get().combo;
        const withinComboWindow =
          lastMatchTimestamp !== null && now - lastMatchTimestamp <= GAME_CONFIG.comboWindowMs;
        const nextCombo = withinComboWindow ? currentCombo + 1 : 1;
        const nextComboBest = Math.max(get().comboBest, nextCombo);

        const newTiles = tiles.map((tile) =>
          tile.id === tile1.id || tile.id === tile2.id ? { ...tile, isMatched: true } : tile,
        );

        const level = LEVELS.find((item) => item.id === currentLevel);
        const newMatchedPairs = matchedPairs + 1;

        set((state) => {
          const comboBonus = Math.max(0, nextCombo - 1) * GAME_CONFIG.comboBonus;
          const newScore = state.score + 100 + comboBonus;

          if (level && newMatchedPairs >= level.pairs) {
            const timeBonus = state.timeLeft * GAME_CONFIG.timeBonus;
            const missionScoreMet = newScore + timeBonus >= level.mission.scoreTarget;
            const missionComboMet = nextComboBest >= level.mission.comboTarget;
            const missionCompleted = missionScoreMet && missionComboMet;
            const finalScore =
              newScore + timeBonus + (missionCompleted ? level.mission.rewardCoins * 5 : 0);
            const newCoins =
              state.coins +
              GAME_CONFIG.coinsPerLevel +
              (missionCompleted ? level.mission.rewardCoins : Math.floor(level.mission.rewardCoins / 2));
            const newStars = state.stars + GAME_CONFIG.starsPerLevel + (missionCompleted ? 1 : 0);
            const nextLevelId = currentLevel + 1;
            let newUnlockedLevels = state.unlockedLevels;
            let newUnlockedChapters = state.unlockedChapters;

            if (nextLevelId <= LEVELS.length && !state.unlockedLevels.includes(nextLevelId)) {
              newUnlockedLevels = [...state.unlockedLevels, nextLevelId];
            }

            const nextLevel = LEVELS.find((item) => item.id === nextLevelId);
            if (nextLevel && !state.unlockedChapters.includes(nextLevel.chapterId)) {
              newUnlockedChapters = [...state.unlockedChapters, nextLevel.chapterId];
            }

            saveData({
              coins: newCoins,
              stars: newStars,
              unlockedLevels: newUnlockedLevels,
              unlockedChapters: newUnlockedChapters,
              bgmEnabled: state.bgmEnabled,
            });

            return {
              tiles: newTiles,
              selectedTiles: [],
              score: finalScore,
              matchedPairs: newMatchedPairs,
              coins: newCoins,
              stars: newStars,
              unlockedLevels: newUnlockedLevels,
              unlockedChapters: newUnlockedChapters,
              isPlaying: false,
              scene: 'result' as GameScene,
              combo: nextCombo,
              comboBest: nextComboBest,
              lastMatchTimestamp: now,
              hintedTileIds: [],
              levelResult: {
                score: finalScore,
                comboBest: nextComboBest,
                coinsEarned: newCoins - state.coins,
                starsEarned: newStars - state.stars,
                missionProgress: {
                  reachedScoreTarget: missionScoreMet,
                  reachedComboTarget: missionComboMet,
                  completedAll: missionCompleted,
                },
                timeLeft: state.timeLeft,
              },
            };
          }

          return {
            tiles: newTiles,
            selectedTiles: [],
            score: newScore,
            matchedPairs: newMatchedPairs,
            combo: nextCombo,
            comboBest: nextComboBest,
            lastMatchTimestamp: now,
            hintedTileIds: [],
          };
        });

        return true;
      }

      set({ selectedTiles: [], combo: 0 });
      return false;
    },

    startLevel: (levelId) => {
      const level = LEVELS.find((item) => item.id === levelId);
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
          combo: 0,
          comboBest: 0,
          hintUsesLeft: GAME_CONFIG.defaultHints,
          shuffleUsesLeft: GAME_CONFIG.defaultShuffles,
          hintedTileIds: [],
          lastMatchTimestamp: null,
          levelResult: null,
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
        combo: 0,
        comboBest: 0,
        hintUsesLeft: GAME_CONFIG.defaultHints,
        shuffleUsesLeft: GAME_CONFIG.defaultShuffles,
        hintedTileIds: [],
        lastMatchTimestamp: null,
        levelResult: null,
      });
    },

    updateTime: () => {
      set((state) => {
        if (state.timeLeft <= 0) {
          const level = LEVELS.find((item) => item.id === state.currentLevel);
          const missionScoreMet = level ? state.score >= level.mission.scoreTarget : false;
          const missionComboMet = level ? state.comboBest >= level.mission.comboTarget : false;

          return {
            timeLeft: 0,
            isPlaying: false,
            scene: 'result' as GameScene,
            combo: 0,
            levelResult: {
              score: state.score,
              comboBest: state.comboBest,
              coinsEarned: 0,
              starsEarned: 0,
              missionProgress: {
                reachedScoreTarget: missionScoreMet,
                reachedComboTarget: missionComboMet,
                completedAll: missionScoreMet && missionComboMet,
              },
              timeLeft: 0,
            },
          };
        }

        return { timeLeft: state.timeLeft - 1 };
      });
    },

    togglePause: () => {
      set((state) => ({ isPaused: !state.isPaused }));
    },

    toggleBgm: () => {
      set((state) => {
        const nextBgmEnabled = !state.bgmEnabled;
        saveData({
          coins: state.coins,
          stars: state.stars,
          unlockedLevels: state.unlockedLevels,
          unlockedChapters: state.unlockedChapters,
          bgmEnabled: nextBgmEnabled,
        });
        return { bgmEnabled: nextBgmEnabled };
      });
    },

    triggerHint: () => {
      const { hintUsesLeft, tiles, rows, cols, isPlaying, isPaused } = get();
      if (!isPlaying || isPaused || hintUsesLeft <= 0) return;

      const hintPair = findHintPair(tiles, rows, cols);
      if (!hintPair) return;

      const hintedTileIds = hintPair.map((tile) => tile.id);
      set({
        hintUsesLeft: hintUsesLeft - 1,
        hintedTileIds,
      });

      window.setTimeout(() => {
        if (get().hintedTileIds.length > 0) {
          set({ hintedTileIds: [] });
        }
      }, 1800);
    },

    triggerShuffle: () => {
      const { shuffleUsesLeft, tiles, isPlaying, isPaused } = get();
      if (!isPlaying || isPaused || shuffleUsesLeft <= 0) return;

      set({
        tiles: shuffleUnmatchedTiles(tiles),
        shuffleUsesLeft: shuffleUsesLeft - 1,
        selectedTiles: [],
        hintedTileIds: [],
      });
    },
  };
});

export const chapterCount = CHAPTERS.length;
