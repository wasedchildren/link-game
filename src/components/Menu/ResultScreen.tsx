import { useGameStore } from '@/store/gameStore';
import { LEVELS } from '@/game/config/GameConfig';
import { soundManager } from '@/game/systems/SoundManager';
import { useEffect } from 'react';

export function ResultScreen() {
  const { currentLevel, score, coins, stars, matchedPairs, nextLevel, setScene } = useGameStore();
  
  const level = LEVELS.find(l => l.id === currentLevel);
  const isWin = level && matchedPairs >= level.pairs;
  const hasNextLevel = currentLevel < LEVELS.length;

  useEffect(() => {
    if (isWin) {
      soundManager.playLevelComplete();
    } else {
      soundManager.playError();
    }
  }, []);

  const handleNextLevel = () => {
    soundManager.playClick();
    nextLevel();
  };

  const handleReplay = () => {
    soundManager.playClick();
    setScene('level_select');
  };

  const handleHome = () => {
    soundManager.playClick();
    setScene('menu');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950">
      <div className="bg-gradient-to-br from-purple-800/80 to-indigo-900/80 rounded-3xl p-8 shadow-2xl border border-purple-400/30 max-w-sm w-full text-center">
        <div className="text-6xl mb-4">
          {isWin ? '🎉' : '😢'}
        </div>
        
        <h1 className={`text-3xl font-bold mb-2 ${isWin ? 'text-green-400' : 'text-red-400'}`}>
          {isWin ? '恭喜过关！' : '时间到！'}
        </h1>
        
        <p className="text-white/70 mb-6">
          {isWin ? `成功完成关卡 ${currentLevel}` : '未能在时间内完成'}
        </p>

        <div className="bg-white/10 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/70">得分</span>
            <span className="text-yellow-400 font-bold text-xl">{score}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/70">金币</span>
            <span className="text-green-400 font-bold text-xl">💰 {coins}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">星星</span>
            <span className="text-purple-400 font-bold text-xl">⭐ {stars}</span>
          </div>
        </div>

        <div className="space-y-3">
          {isWin && hasNextLevel && (
            <button
              onClick={handleNextLevel}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              🚀 下一关
            </button>
          )}
          
          <button
            onClick={handleReplay}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg"
          >
            🔄 选择关卡
          </button>
          
          <button
            onClick={handleHome}
            className="w-full py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold rounded-xl transition-all duration-200 shadow-lg"
          >
            🏠 返回主页
          </button>
        </div>
      </div>
    </div>
  );
}
