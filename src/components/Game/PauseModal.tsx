import { useGameStore } from '@/store/gameStore';
import { soundManager } from '@/game/systems/SoundManager';

export function PauseModal() {
  const { isPaused, togglePause, setScene } = useGameStore();
  
  if (!isPaused) return null;

  const handleClick = () => {
    soundManager.playClick();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-950 rounded-3xl p-8 shadow-2xl border border-purple-400/30 max-w-sm w-full mx-4">
        <h2 className="text-3xl font-bold text-center text-white mb-6">⏸️ 游戏暂停</h2>
        
        <div className="space-y-3">
          <button
            onClick={() => { handleClick(); togglePause(); }}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            继续游戏
          </button>
          
          <button
            onClick={() => { handleClick(); setScene('level_select'); }}
            className="w-full py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold rounded-xl transition-all duration-200 shadow-lg"
          >
            返回选关
          </button>
          
          <button
            onClick={() => { handleClick(); setScene('menu'); }}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg"
          >
            返回主页
          </button>
        </div>
      </div>
    </div>
  );
}
