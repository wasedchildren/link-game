import { useGameStore } from '@/store/gameStore';
import { soundManager } from '@/game/systems/SoundManager';
import { Music2, Music4, Pause } from 'lucide-react';
import { useI18n } from '@/i18n';

export function PauseModal() {
  const { isPaused, togglePause, setScene, bgmEnabled, toggleBgm } = useGameStore();
  const { t } = useI18n();
  
  if (!isPaused) return null;

  const handleClick = () => {
    soundManager.playClick();
  };

  const handleToggleBgm = () => {
    soundManager.playClick();
    const nextEnabled = !bgmEnabled;
    soundManager.setBgmEnabled(nextEnabled);
    toggleBgm();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-950 rounded-3xl p-8 shadow-2xl border border-purple-400/30 max-w-sm w-full mx-4">
        <h2 className="mb-6 flex items-center justify-center gap-3 text-3xl font-bold text-white">
          <Pause className="h-7 w-7" />
          <span>{t('pause.title')}</span>
        </h2>
        
        <div className="space-y-3">
          <button
            onClick={handleToggleBgm}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-purple-300/30 bg-white/10 py-4 font-bold text-white transition-all duration-200 hover:bg-white/20"
          >
            {bgmEnabled ? (
              <Music4 className="h-5 w-5 text-emerald-300" />
            ) : (
              <Music2 className="h-5 w-5 text-rose-300" />
            )}
            {bgmEnabled ? t('audio.turnOffBgm') : t('audio.turnOnBgm')}
          </button>

          <button
            onClick={() => { handleClick(); togglePause(); }}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {t('pause.resume')}
          </button>
          
          <button
            onClick={() => { handleClick(); setScene('level_select'); }}
            className="w-full py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold rounded-xl transition-all duration-200 shadow-lg"
          >
            {t('pause.backToLevelSelect')}
          </button>
          
          <button
            onClick={() => { handleClick(); setScene('menu'); }}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg"
          >
            {t('pause.backToHome')}
          </button>
        </div>
      </div>
    </div>
  );
}
