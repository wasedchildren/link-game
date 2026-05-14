import type { Level, Tile } from '@/types/game';

export const ICONS = [
  0, 1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

export const LEVELS: Level[] = [
  { id: 1, nameKey: 'levels.level1', rows: 4, cols: 4, pairs: 8, timeLimit: 120 },
  { id: 2, nameKey: 'levels.level2', rows: 4, cols: 6, pairs: 12, timeLimit: 150 },
  { id: 3, nameKey: 'levels.level3', rows: 6, cols: 6, pairs: 18, timeLimit: 180 },
  { id: 4, nameKey: 'levels.level4', rows: 6, cols: 8, pairs: 24, timeLimit: 200 },
  { id: 5, nameKey: 'levels.level5', rows: 8, cols: 8, pairs: 32, timeLimit: 240 },
];

export const GAME_CONFIG = {
  baseCoins: 100,
  coinsPerLevel: 50,
  starsPerLevel: 1,
  timeBonus: 10,
};

export function generateTiles(level: Level): Tile[] {
  const totalTiles = level.rows * level.cols;
  const pairCount = totalTiles / 2;
  
  const selectedIcons = ICONS.slice(0, pairCount);
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
  
  tiles.forEach(tile => {
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
  const queue: { row: number; col: number; turns: number; path: [number, number][] }[] = [
    { row: start.row, col: start.col, turns: 0, path: [[start.row, start.col]] }
  ];
  const visited = new Set<string>();
  
  while (queue.length > 0) {
    const { row, col, turns, path } = queue.shift()!;
    
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
            path: [...path, [newRow, newCol]]
          });
        }
        
        newRow += dr;
        newCol += dc;
      }
    }
  }
  
  return false;
}
