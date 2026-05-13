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
    <div className="w-full max-w-md px-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <span className="text-white font-bold text-lg">{score}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-white/70 text-sm">关卡 {currentLevel}</span>
          <span className="text-white font-medium">{level?.name}</span>
        </div>
        
        <button
          onClick={togglePause}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <span className="text-2xl">{isPaused ? '▶️' : '⏸️'}</span>
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className={`flex-1 flex items-center gap-2 ${getTimeColor()}`}>
          <span className="text-xl">⏱️</span>
          <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
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
