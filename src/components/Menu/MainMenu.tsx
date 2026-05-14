import { useGameStore } from '@/store/gameStore';
import { soundManager } from '@/game/systems/SoundManager';
import { BookOpen, Coins, Play, Star } from 'lucide-react';
import { SpriteIcon } from '@/components/ui/SpriteIcon';
import { useI18n } from '@/i18n';

export function MainMenu() {
  const { setScene, coins, stars } = useGameStore();
  const { t } = useI18n();

  const handleStart = () => {
    soundManager.playClick();
    setScene('level_select');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950">
      <div className="text-center mb-8">
        <h1 className="mb-4 flex items-center justify-center gap-3 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400">
          <SpriteIcon icon={38} size={42} label={t('game.iconLabel')} />
          <span>{t('app.shortName')}</span>
        </h1>
        <p className="text-white/70 text-lg">{t('app.tagline')}</p>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center gap-2">
          <Coins className="h-6 w-6 text-amber-300" />
          <span className="text-white font-bold text-xl">{coins}</span>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center gap-2">
          <Star className="h-6 w-6 fill-yellow-300 text-yellow-300" />
          <span className="text-white font-bold text-xl">{stars}</span>
        </div>
      </div>

      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={handleStart}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 py-5 text-xl font-bold text-white transition-all duration-200 shadow-lg hover:scale-105 hover:from-pink-600 hover:to-purple-700 hover:shadow-xl active:scale-95"
        >
          <Play className="h-6 w-6 fill-current" />
          {t('menu.startGame')}
        </button>
        
        <button
          onClick={() => { soundManager.playClick(); }}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-white/10 py-4 font-bold text-white transition-all duration-200 hover:bg-white/20"
        >
          <BookOpen className="h-5 w-5" />
          {t('menu.howToPlay')}
        </button>
      </div>

      <div className="mt-12 text-white/40 text-sm text-center">
        <p>{t('app.instructions')}</p>
      </div>
    </div>
  );
}
