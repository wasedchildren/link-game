import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { getChapterByLevelId } from '@/game/config/GameConfig';
import { soundManager } from '@/game/systems/SoundManager';
import { SpriteIcon } from '@/components/ui/SpriteIcon';

export function GameBoard() {
  const { tiles, selectedTiles, selectTile, rows, cols, hintedTileIds, currentLevel } = useGameStore();
  const [viewport, setViewport] = useState(() => ({
    width: typeof window === 'undefined' ? 390 : window.innerWidth,
    height: typeof window === 'undefined' ? 844 : window.innerHeight,
  }));
  const currentChapter = getChapterByLevelId(currentLevel);
  const boardThemeClass =
    currentChapter?.id === 1
      ? 'border-amber-300/30 bg-gradient-to-br from-rose-900/45 to-fuchsia-950/45'
      : currentChapter?.id === 2
        ? 'border-cyan-300/30 bg-gradient-to-br from-cyan-900/40 to-sky-950/50'
        : currentChapter?.id === 3
          ? 'border-sky-300/30 bg-gradient-to-br from-slate-900/40 to-indigo-950/50'
          : 'border-fuchsia-300/30 bg-gradient-to-br from-violet-900/45 to-purple-950/50';

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  const handleTileClick = (tile: typeof tiles[0]) => {
    if (tile.isMatched) return;
    
    const isSelected = selectedTiles.some(t => t.id === tile.id);
    
    if (isSelected) {
      soundManager.playClick();
    } else {
      soundManager.playSelect();
    }
    
    selectTile(tile);
  };

  const isSelected = (tile: typeof tiles[0]) => {
    return selectedTiles.some(t => t.id === tile.id);
  };

  const isHinted = (tile: typeof tiles[0]) => {
    return hintedTileIds.includes(tile.id);
  };

  const getTileStyle = () => {
    const gap = 4;
    const boardPadding = viewport.width < 640 ? 16 : 24;
    const horizontalPadding = viewport.width < 640 ? 40 : 80;
    const verticalBudget = viewport.height < 740 ? 250 : 290;
    const availableWidth = Math.max(220, viewport.width - horizontalPadding);
    const availableHeight = Math.max(220, viewport.height - verticalBudget);
    const tileWidth = (availableWidth - boardPadding * 2 - gap * (cols - 1)) / cols;
    const tileHeight = (availableHeight - boardPadding * 2 - gap * (rows - 1)) / rows;
    const tileSize = Math.max(28, Math.min(60, Math.floor(Math.min(tileWidth, tileHeight))));
    
    return {
      width: `${tileSize}px`,
      height: `${tileSize}px`,
      iconSize: Math.max(20, Math.floor(tileSize * 0.62)),
    };
  };

  const tileStyle = getTileStyle();

  return (
    <div className="flex w-full flex-1 items-start justify-center overflow-hidden">
      <div 
        className={`grid max-w-full gap-1 rounded-2xl border p-4 shadow-2xl sm:p-6 ${boardThemeClass}`}
        style={{
          gridTemplateRows: `repeat(${rows}, ${tileStyle.height})`,
          gridTemplateColumns: `repeat(${cols}, ${tileStyle.width})`,
        }}
      >
        {tiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => handleTileClick(tile)}
            disabled={tile.isMatched}
            className={`
              flex items-center justify-center rounded-xl transition-all duration-200
              ${tile.isMatched 
                ? 'opacity-0 cursor-default scale-0' 
                : isSelected(tile)
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/50 scale-110 ring-4 ring-yellow-300'
                  : isHinted(tile)
                    ? 'bg-gradient-to-br from-cyan-300 to-sky-500 shadow-lg shadow-cyan-500/40 ring-4 ring-cyan-200'
                  : 'bg-gradient-to-br from-white to-gray-100 hover:from-gray-50 hover:to-white shadow-md hover:shadow-lg hover:scale-105'
              }
              border-2 border-white/80
              active:scale-95
            `}
            style={tileStyle}
          >
            <SpriteIcon
              icon={tile.icon}
              size={tileStyle.iconSize}
              className="drop-shadow-sm"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
