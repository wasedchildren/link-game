import { useGameStore } from '@/store/gameStore';
import { soundManager } from '@/game/systems/SoundManager';

export function GameBoard() {
  const { tiles, selectedTiles, selectTile, rows, cols } = useGameStore();

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

  const getTileStyle = () => {
    const baseWidth = Math.min(60, 400 / cols);
    const baseHeight = Math.min(60, 400 / rows);
    
    return {
      width: `${baseWidth}px`,
      height: `${baseHeight}px`,
      fontSize: `${Math.min(baseWidth, baseHeight) * 0.6}px`,
    };
  };

  const tileStyle = getTileStyle();

  return (
    <div className="flex flex-col items-center">
      <div 
        className="grid gap-1 p-3 bg-gradient-to-br from-purple-800/50 to-indigo-900/50 rounded-2xl shadow-2xl border border-purple-400/30"
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
                  : 'bg-gradient-to-br from-white to-gray-100 hover:from-gray-50 hover:to-white shadow-md hover:shadow-lg hover:scale-105'
              }
              border-2 border-white/80
              active:scale-95
            `}
            style={tileStyle}
          >
            <span className="drop-shadow-sm">{tile.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
