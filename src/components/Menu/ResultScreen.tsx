import { useGameStore } from '@/store/gameStore';
import { LEVELS } from '@/game/config/GameConfig';
import { soundManager } from '@/game/systems/SoundManager';
import { useEffect } from 'react';
import { Coins, Home, RotateCcw, SkipForward, Star, XCircle } from 'lucide-react';
import { SpriteIcon } from '@/components/ui/SpriteIcon';
import { useI18n } from '@/i18n';

export function ResultScreen() {
  const { currentLevel, score, coins, stars, matchedPairs, nextLevel, setScene } = useGameStore();
  const { t } = useI18n();
  
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
        <div className="mb-4 flex justify-center">
          {isWin ? (
            <SpriteIcon icon={37} size={76} label={t('result.trophy')} />
          ) : (
            <XCircle className="h-20 w-20 text-rose-400" />
          )}
        </div>
        
        <h1 className={`text-3xl font-bold mb-2 ${isWin ? 'text-green-400' : 'text-red-400'}`}>
          {isWin ? t('result.winTitle') : t('result.loseTitle')}
        </h1>
        
        <p className="text-white/70 mb-6">
          {isWin ? t('result.winMessage', { level: currentLevel }) : t('result.loseMessage')}
        </p>

        <div className="bg-white/10 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/70">{t('common.score')}</span>
            <span className="text-yellow-400 font-bold text-xl">{score}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/70">{t('common.coins')}</span>
            <span className="inline-flex items-center gap-2 text-xl font-bold text-green-400">
              <Coins className="h-5 w-5" />
              {coins}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">{t('common.stars')}</span>
            <span className="inline-flex items-center gap-2 text-xl font-bold text-purple-400">
              <Star className="h-5 w-5 fill-current" />
              {stars}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {isWin && hasNextLevel && (
            <button
              onClick={handleNextLevel}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 py-4 font-bold text-white transition-all duration-200 shadow-lg hover:from-green-600 hover:to-emerald-700 hover:shadow-xl"
            >
              <SkipForward className="h-5 w-5" />
              {t('common.nextLevel')}
            </button>
          )}
          
          <button
            onClick={handleReplay}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 py-4 font-bold text-white transition-all duration-200 shadow-lg hover:from-blue-600 hover:to-indigo-700"
          >
            <RotateCcw className="h-5 w-5" />
            {t('result.goToLevelSelect')}
          </button>
          
          <button
            onClick={handleHome}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 py-4 font-bold text-white transition-all duration-200 shadow-lg hover:from-gray-700 hover:to-gray-800"
          >
            <Home className="h-5 w-5" />
            {t('result.backToHome')}
          </button>
        </div>
      </div>
    </div>
  );
}
