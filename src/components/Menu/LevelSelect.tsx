import { useGameStore } from '@/store/gameStore';
import { LEVELS } from '@/game/config/GameConfig';
import { soundManager } from '@/game/systems/SoundManager';

export function LevelSelect() {
  const { unlockedLevels, startLevel, setScene, coins, stars } = useGameStore();

  const isLevelUnlocked = (levelId: number) => {
    return unlockedLevels.includes(levelId);
  };

  const handleSelectLevel = (levelId: number) => {
    if (!isLevelUnlocked(levelId)) return;
    soundManager.playClick();
    startLevel(levelId);
  };

  const handleBack = () => {
    soundManager.playClick();
    setScene('menu');
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950">
      <div className="flex items-center justify-between w-full max-w-md mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <span className="text-xl">←</span>
          <span>返回</span>
        </button>
        
        <div className="flex gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
            <span className="text-lg">💰</span>
            <span className="text-white font-bold">{coins}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <span className="text-white font-bold">{stars}</span>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-white mb-6">选择关卡</h1>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        {LEVELS.map((level) => {
          const unlocked = isLevelUnlocked(level.id);
          return (
            <button
              key={level.id}
              onClick={() => handleSelectLevel(level.id)}
              disabled={!unlocked}
              className={`
                aspect-square rounded-2xl transition-all duration-200 flex flex-col items-center justify-center
                ${unlocked 
                  ? 'bg-gradient-to-br from-pink-500/80 to-purple-600/80 hover:from-pink-500 hover:to-purple-600 shadow-lg hover:shadow-xl hover:scale-105' 
                  : 'bg-gray-700/50 opacity-50 cursor-not-allowed'
                }
              `}
            >
              <span className={`text-4xl ${!unlocked ? 'grayscale' : ''}`}>
                {unlocked ? '🎮' : '🔒'}
              </span>
              <span className={`font-bold mt-2 ${unlocked ? 'text-white' : 'text-gray-400'}`}>
                关卡 {level.id}
              </span>
              <span className={`text-xs mt-1 ${unlocked ? 'text-white/70' : 'text-gray-500'}`}>
                {level.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 w-full max-w-md">
        <h3 className="text-white font-bold mb-2">游戏规则</h3>
        <ul className="text-white/70 text-sm space-y-1">
          <li>• 点击两个相同的图标进行配对</li>
          <li>• 连线最多只能有两次转弯</li>
          <li>• 在时间结束前消除所有图标</li>
          <li>• 剩余时间越多，得分越高</li>
        </ul>
      </div>
    </div>
  );
}
