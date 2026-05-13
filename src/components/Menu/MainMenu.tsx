import { useGameStore } from '@/store/gameStore';
import { soundManager } from '@/game/systems/SoundManager';

export function MainMenu() {
  const { setScene, coins, stars } = useGameStore();

  const handleStart = () => {
    soundManager.playClick();
    setScene('level_select');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 mb-4">
          🎮 连连看
        </h1>
        <p className="text-white/70 text-lg">找到相同的图标，用连线消除它们！</p>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <span className="text-white font-bold text-xl">{coins}</span>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <span className="text-white font-bold text-xl">{stars}</span>
        </div>
      </div>

      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={handleStart}
          className="w-full py-5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xl rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          🎯 开始游戏
        </button>
        
        <button
          onClick={() => { soundManager.playClick(); }}
          className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all duration-200"
        >
          📖 游戏说明
        </button>
      </div>

      <div className="mt-12 text-white/40 text-sm text-center">
        <p>点击两个相同的图标，如果可以用不超过两次转弯的线连接，它们就会消除！</p>
      </div>
    </div>
  );
}
