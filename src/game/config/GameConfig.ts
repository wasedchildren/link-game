import type { Chapter, Level, Tile } from '@/types/game';

export const ICONS = [
  0, 1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    nameKey: 'chapters.chapter1.name',
    themeKey: 'chapters.chapter1.theme',
    summaryKey: 'chapters.chapter1.summary',
    accentFrom: 'from-amber-400',
    accentTo: 'to-rose-500',
    mascotIcon: 8,
  },
  {
    id: 2,
    nameKey: 'chapters.chapter2.name',
    themeKey: 'chapters.chapter2.theme',
    summaryKey: 'chapters.chapter2.summary',
    accentFrom: 'from-emerald-400',
    accentTo: 'to-cyan-500',
    mascotIcon: 18,
  },
  {
    id: 3,
    nameKey: 'chapters.chapter3.name',
    themeKey: 'chapters.chapter3.theme',
    summaryKey: 'chapters.chapter3.summary',
    accentFrom: 'from-sky-400',
    accentTo: 'to-indigo-500',
    mascotIcon: 28,
  },
  {
    id: 4,
    nameKey: 'chapters.chapter4.name',
    themeKey: 'chapters.chapter4.theme',
    summaryKey: 'chapters.chapter4.summary',
    accentFrom: 'from-fuchsia-400',
    accentTo: 'to-violet-500',
    mascotIcon: 38,
  },
];

const CHAPTER_ICON_POOLS: Record<number, number[]> = {
  1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  2: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  3: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 0, 4, 8, 12, 16, 30, 34, 35, 36, 37],
  4: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 5, 9, 13, 17, 21, 25, 29, 18, 19, 28],
};

export function getChapterById(chapterId: number) {
  return CHAPTERS.find((chapter) => chapter.id === chapterId);
}

export function getChapterByLevelId(levelId: number) {
  const level = LEVELS.find((item) => item.id === levelId);
  if (!level) return undefined;
  return getChapterById(level.chapterId);
}

function getIconPoolForLevel(level: Level) {
  const chapterPool = CHAPTER_ICON_POOLS[level.chapterId] ?? ICONS;
  const remainingIcons = ICONS.filter((icon) => !chapterPool.includes(icon));
  return [...chapterPool, ...remainingIcons];
}

export const LEVELS: Level[] = [
  { id: 1, chapterId: 1, nameKey: 'levels.level1', rows: 4, cols: 4, pairs: 8, timeLimit: 100, mission: { scoreTarget: 900, comboTarget: 2, rewardCoins: 20 } },
  { id: 2, chapterId: 1, nameKey: 'levels.level2', rows: 4, cols: 5, pairs: 10, timeLimit: 105, mission: { scoreTarget: 1200, comboTarget: 2, rewardCoins: 25 } },
  { id: 3, chapterId: 1, nameKey: 'levels.level3', rows: 4, cols: 6, pairs: 12, timeLimit: 120, mission: { scoreTarget: 1450, comboTarget: 3, rewardCoins: 25 } },
  { id: 4, chapterId: 1, nameKey: 'levels.level4', rows: 5, cols: 6, pairs: 15, timeLimit: 140, mission: { scoreTarget: 1800, comboTarget: 3, rewardCoins: 30 } },
  { id: 5, chapterId: 1, nameKey: 'levels.level5', rows: 6, cols: 6, pairs: 18, timeLimit: 150, mission: { scoreTarget: 2200, comboTarget: 4, rewardCoins: 30 } },
  { id: 6, chapterId: 2, nameKey: 'levels.level6', rows: 4, cols: 6, pairs: 12, timeLimit: 100, mission: { scoreTarget: 1500, comboTarget: 3, rewardCoins: 25 } },
  { id: 7, chapterId: 2, nameKey: 'levels.level7', rows: 5, cols: 6, pairs: 15, timeLimit: 120, mission: { scoreTarget: 1900, comboTarget: 3, rewardCoins: 30 } },
  { id: 8, chapterId: 2, nameKey: 'levels.level8', rows: 6, cols: 6, pairs: 18, timeLimit: 135, mission: { scoreTarget: 2300, comboTarget: 4, rewardCoins: 35 } },
  { id: 9, chapterId: 2, nameKey: 'levels.level9', rows: 6, cols: 7, pairs: 21, timeLimit: 155, mission: { scoreTarget: 2800, comboTarget: 4, rewardCoins: 35 } },
  { id: 10, chapterId: 2, nameKey: 'levels.level10', rows: 6, cols: 8, pairs: 24, timeLimit: 170, mission: { scoreTarget: 3300, comboTarget: 5, rewardCoins: 40 } },
  { id: 11, chapterId: 3, nameKey: 'levels.level11', rows: 5, cols: 6, pairs: 15, timeLimit: 110, mission: { scoreTarget: 2000, comboTarget: 3, rewardCoins: 30 } },
  { id: 12, chapterId: 3, nameKey: 'levels.level12', rows: 6, cols: 6, pairs: 18, timeLimit: 125, mission: { scoreTarget: 2450, comboTarget: 4, rewardCoins: 35 } },
  { id: 13, chapterId: 3, nameKey: 'levels.level13', rows: 6, cols: 7, pairs: 21, timeLimit: 145, mission: { scoreTarget: 2950, comboTarget: 4, rewardCoins: 40 } },
  { id: 14, chapterId: 3, nameKey: 'levels.level14', rows: 6, cols: 8, pairs: 24, timeLimit: 155, mission: { scoreTarget: 3450, comboTarget: 5, rewardCoins: 40 } },
  { id: 15, chapterId: 3, nameKey: 'levels.level15', rows: 7, cols: 8, pairs: 28, timeLimit: 175, mission: { scoreTarget: 4050, comboTarget: 5, rewardCoins: 45 } },
  { id: 16, chapterId: 4, nameKey: 'levels.level16', rows: 6, cols: 6, pairs: 18, timeLimit: 115, mission: { scoreTarget: 2550, comboTarget: 4, rewardCoins: 35 } },
  { id: 17, chapterId: 4, nameKey: 'levels.level17', rows: 6, cols: 7, pairs: 21, timeLimit: 130, mission: { scoreTarget: 3100, comboTarget: 4, rewardCoins: 40 } },
  { id: 18, chapterId: 4, nameKey: 'levels.level18', rows: 6, cols: 8, pairs: 24, timeLimit: 145, mission: { scoreTarget: 3600, comboTarget: 5, rewardCoins: 45 } },
  { id: 19, chapterId: 4, nameKey: 'levels.level19', rows: 7, cols: 8, pairs: 28, timeLimit: 165, mission: { scoreTarget: 4250, comboTarget: 5, rewardCoins: 50 } },
  { id: 20, chapterId: 4, nameKey: 'levels.level20', rows: 8, cols: 8, pairs: 32, timeLimit: 190, mission: { scoreTarget: 5000, comboTarget: 6, rewardCoins: 60 } },
];

export const GAME_CONFIG = {
  baseCoins: 100,
  coinsPerLevel: 50,
  starsPerLevel: 1,
  timeBonus: 10,
  comboWindowMs: 4000,
  comboBonus: 30,
  defaultHints: 2,
  defaultShuffles: 1,
};

export function generateTiles(level: Level): Tile[] {
  const totalTiles = level.rows * level.cols;
  const pairCount = totalTiles / 2;
  const iconPool = getIconPoolForLevel(level);
  const selectedIcons = iconPool.slice(0, pairCount);
  const tileIcons = [...selectedIcons, ...selectedIcons];

  shuffleArray(tileIcons);

  const tiles: Tile[] = [];
  let id = 0;

  for (let row = 0; row < level.rows; row++) {
    for (let col = 0; col < level.cols; col++) {
      tiles.push({
        id: `tile-${id++}`,
        icon: tileIcons[row * level.cols + col],
        row,
        col,
        isMatched: false,
      });
    }
  }

  return tiles;
}

export function findHintPair(tiles: Tile[], rows: number, cols: number): [Tile, Tile] | null {
  const availableTiles = tiles.filter((tile) => !tile.isMatched);

  for (let i = 0; i < availableTiles.length; i++) {
    for (let j = i + 1; j < availableTiles.length; j++) {
      const firstTile = availableTiles[i];
      const secondTile = availableTiles[j];

      if (canConnect(firstTile, secondTile, tiles, rows, cols)) {
        return [firstTile, secondTile];
      }
    }
  }

  return null;
}

export function shuffleUnmatchedTiles(tiles: Tile[]): Tile[] {
  const unmatchedTiles = tiles.filter((tile) => !tile.isMatched);
  const shuffledIcons = unmatchedTiles.map((tile) => tile.icon);

  shuffleArray(shuffledIcons);

  let iconIndex = 0;

  return tiles.map((tile) => {
    if (tile.isMatched) {
      return tile;
    }

    const nextTile = {
      ...tile,
      icon: shuffledIcons[iconIndex],
    };

    iconIndex += 1;
    return nextTile;
  });
}

function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function canConnect(tile1: Tile, tile2: Tile, tiles: Tile[], rows: number, cols: number): boolean {
  if (tile1.id === tile2.id) return false;
  if (tile1.isMatched || tile2.isMatched) return false;
  if (tile1.icon !== tile2.icon) return false;

  const grid: boolean[][] = Array(rows).fill(null).map(() => Array(cols).fill(true));

  tiles.forEach((tile) => {
    if (!tile.isMatched) {
      grid[tile.row][tile.col] = false;
    }
  });

  grid[tile1.row][tile1.col] = true;
  grid[tile2.row][tile2.col] = true;

  return bfs(tile1, tile2, grid, rows, cols);
}

function bfs(start: Tile, end: Tile, grid: boolean[][], rows: number, cols: number): boolean {
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  const queue: { row: number; col: number; turns: number }[] = [
    { row: start.row, col: start.col, turns: 0 },
  ];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const { row, col, turns } = queue.shift()!;

    if (row === end.row && col === end.col && turns <= 2) {
      return true;
    }

    if (turns > 2) continue;

    const key = `${row},${col}`;
    if (visited.has(key)) continue;
    visited.add(key);

    for (const [dr, dc] of directions) {
      let newRow = row + dr;
      let newCol = col + dc;

      while (newRow >= -1 && newRow <= rows && newCol >= -1 && newCol <= cols) {
        if (newRow === end.row && newCol === end.col) {
          return true;
        }

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          if (!grid[newRow][newCol]) break;
        }

        const newKey = `${newRow},${newCol}`;
        if (!visited.has(newKey)) {
          queue.push({
            row: newRow,
            col: newCol,
            turns: turns + 1,
          });
        }

        newRow += dr;
        newCol += dc;
      }
    }
  }

  return false;
}
