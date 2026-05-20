import { useGameStore } from '@/store/gameStore';
import { LEVELS } from '@/game/config/GameConfig';
import { soundManager } from '@/game/systems/SoundManager';
import { Clock3, Lightbulb, Music2, Music4, Pause, Play, Shuffle, Trophy } from 'lucide-react';
import { useI18n } from '@/i18n';

export function GameHeader() {
  const {
    currentLevel,
    score,
    timeLeft,
    isPaused,
    togglePause,
    matchedPairs,
    bgmEnabled,
    toggleBgm,
    combo,
    comboBest,
    hintUsesLeft,
    shuffleUsesLeft,
    triggerHint,
    triggerShuffle,
  } = useGameStore();
  const { t } = useI18n();
  
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

  const handleToggleBgm = () => {
    soundManager.playClick();
    const nextEnabled = !bgmEnabled;
    soundManager.setBgmEnabled(nextEnabled);
    toggleBgm();
  };

  const handleHint = () => {
    soundManager.playClick();
    triggerHint();
  };

  const handleShuffle = () => {
    soundManager.playClick();
    triggerShuffle();
  };

  return (
    <div className="mb-4 w-full max-w-2xl px-2 sm:px-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-300" />
          <span className="text-lg font-bold text-white sm:text-xl">{score}</span>
        </div>
        
        <div className="min-w-0 flex-1 text-center">
          <div className="text-sm text-white/70">{t('common.levelLabel', { level: currentLevel })}</div>
          <div className="truncate text-sm font-medium text-white sm:text-base">
            {level ? t(level.nameKey) : ''}
          </div>
        </div>
        
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={handleToggleBgm}
            className="flex h-10 min-w-10 items-center justify-center rounded-full border border-purple-300/30 bg-white/10 px-3 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label={bgmEnabled ? t('audio.turnOffBgm') : t('audio.turnOnBgm')}
            title={bgmEnabled ? t('audio.turnOffBgm') : t('audio.turnOnBgm')}
          >
            {bgmEnabled ? (
              <Music4 className="h-5 w-5 text-emerald-300" />
            ) : (
              <Music2 className="h-5 w-5 text-rose-300" />
            )}
          </button>

          <button
            onClick={togglePause}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            aria-label={isPaused ? t('pause.resume') : t('pause.title')}
          >
            {isPaused ? <Play className="h-5 w-5 text-white" /> : <Pause className="h-5 w-5 text-white" />}
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`flex flex-1 items-center gap-2 ${getTimeColor()}`}>
          <Clock3 className="h-5 w-5" />
          <span className="font-mono text-lg font-bold sm:text-xl">{formatTime(timeLeft)}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between text-white/70 text-xs mb-1">
            <span>{t('common.progress')}</span>
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

      {level && (
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <div className="rounded-2xl border border-white/10 bg-white/8 p-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              {t('game.missionTitle')}
            </div>
            <div className="mt-2 text-sm leading-6 text-white/72">
              {t('game.missionSummary', {
                score: level.mission.scoreTarget,
                combo: level.mission.comboTarget,
              })}
            </div>
            <div className="mt-2 text-xs text-white/50">
              {t('game.comboState', { combo, best: comboBest })}
            </div>
          </div>

          <button
            onClick={handleHint}
            className="rounded-2xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-left text-white transition hover:bg-amber-400/16"
          >
            <div className="flex items-center gap-2 text-sm font-bold">
              <Lightbulb className="h-4 w-4 text-amber-300" />
              {t('game.tools.hint')}
            </div>
            <div className="mt-1 text-xs text-white/62">
              {t('game.toolsRemaining', { count: hintUsesLeft })}
            </div>
          </button>

          <button
            onClick={handleShuffle}
            className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-left text-white transition hover:bg-cyan-400/16"
          >
            <div className="flex items-center gap-2 text-sm font-bold">
              <Shuffle className="h-4 w-4 text-cyan-300" />
              {t('game.tools.shuffle')}
            </div>
            <div className="mt-1 text-xs text-white/62">
              {t('game.toolsRemaining', { count: shuffleUsesLeft })}
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
