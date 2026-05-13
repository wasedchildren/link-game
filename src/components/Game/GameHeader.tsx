import { useGameStore } from '@/store/gameStore';
import { LEVELS } from '@/game/config/GameConfig';

export function GameHeader() {
  const { currentLevel, score, timeLeft, isPaused, togglePause, matchedPairs } = useGameStore();
  
  const level = LEVELS.find(l => l.id === currentLevel);
  const progress = level ? Math.round((matchedPairs / level.pairs) * 100) : 0;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 30) return 'text-red-500';
    if (timeLeft <= 60) return 'text-yellow-500';
    return 'text-green-400';
  };

  return (
    <div className="mb-4 w-full max-w-md px-2 sm:px-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <span className="text-lg font-bold text-white sm:text-xl">{score}</span>
        </div>
        
        <div className="min-w-0 flex-1 text-center">
          <div className="text-sm text-white/70">关卡 {currentLevel}</div>
          <div className="truncate text-sm font-medium text-white sm:text-base">{level?.name}</div>
        </div>
        
        <button
          onClick={togglePause}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <span className="text-2xl">{isPaused ? '▶️' : '⏸️'}</span>
        </button>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`flex flex-1 items-center gap-2 ${getTimeColor()}`}>
          <span className="text-xl">⏱️</span>
          <span className="font-mono text-lg font-bold sm:text-xl">{formatTime(timeLeft)}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between text-white/70 text-xs mb-1">
            <span>进度</span>
            <span>{matchedPairs}/{level?.pairs}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
