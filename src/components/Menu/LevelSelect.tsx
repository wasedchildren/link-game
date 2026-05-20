import { useGameStore } from '@/store/gameStore';
import { CHAPTERS, LEVELS } from '@/game/config/GameConfig';
import { soundManager } from '@/game/systems/SoundManager';
import { ChevronLeft, Coins, Lock, Star } from 'lucide-react';
import { SpriteIcon } from '@/components/ui/SpriteIcon';
import { useI18n } from '@/i18n';

export function LevelSelect() {
  const { unlockedLevels, unlockedChapters, startLevel, setScene, coins, stars } = useGameStore();
  const { t } = useI18n();

  const isLevelUnlocked = (levelId: number) => unlockedLevels.includes(levelId);
  const isChapterUnlocked = (chapterId: number) => unlockedChapters.includes(chapterId);

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
    <div className="min-h-screen overflow-y-auto bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.18),_transparent_34%),linear-gradient(180deg,_#14031f_0%,_#0d1328_100%)] p-4">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/70 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>{t('common.back')}</span>
          </button>

          <div className="flex gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Coins className="h-5 w-5 text-amber-300" />
              <span className="font-bold text-white">{coins}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
              <span className="font-bold text-white">{stars}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-black text-white">{t('levelSelect.title')}</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-white/68">{t('levelSelect.subtitle')}</p>
        </div>

        <div className="space-y-6">
          {CHAPTERS.map((chapter) => {
            const chapterLevels = LEVELS.filter((level) => level.chapterId === chapter.id);
            const chapterUnlocked = isChapterUnlocked(chapter.id);

            return (
              <section
                key={chapter.id}
                className={`rounded-[32px] border p-5 shadow-xl backdrop-blur lg:p-6 ${
                  chapter.id === 1
                    ? 'border-amber-300/15 bg-gradient-to-br from-amber-500/8 to-rose-500/6'
                    : chapter.id === 2
                      ? 'border-cyan-300/15 bg-gradient-to-br from-emerald-500/8 to-cyan-500/8'
                      : chapter.id === 3
                        ? 'border-sky-300/15 bg-gradient-to-br from-sky-500/8 to-indigo-500/8'
                        : 'border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500/8 to-violet-500/8'
                }`}
              >
                <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-3xl bg-gradient-to-br ${chapter.accentFrom} ${chapter.accentTo} p-4 shadow-lg`}
                    >
                      <SpriteIcon
                        icon={chapter.mascotIcon}
                        size={60}
                        label={t('levelSelect.unlockedLevelIcon')}
                      />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                        {t(chapter.themeKey)}
                      </div>
                      <h2 className="mt-2 text-3xl font-black text-white">{t(chapter.nameKey)}</h2>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-white/68">
                        {t(chapter.summaryKey)}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-semibold text-white/75">
                    {chapterUnlocked ? t('levelSelect.chapterOpen') : t('levelSelect.chapterLocked')}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                  {chapterLevels.map((level) => {
                    const unlocked = chapterUnlocked && isLevelUnlocked(level.id);

                    return (
                      <button
                        key={level.id}
                        onClick={() => handleSelectLevel(level.id)}
                        disabled={!unlocked}
                        className={`
                          rounded-[24px] border border-white/10 p-4 text-left transition-all duration-200
                          ${unlocked
                            ? 'bg-gradient-to-br from-white/12 to-white/6 hover:translate-y-[-2px] hover:border-white/25'
                            : 'cursor-not-allowed bg-slate-800/40 opacity-55'
                          }
                        `}
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                              unlocked ? 'bg-white/10 text-white/75' : 'bg-black/20 text-white/40'
                            }`}
                          >
                            {t('common.levelLabel', { level: level.id })}
                          </span>
                          {unlocked ? (
                            <SpriteIcon
                              icon={chapter.mascotIcon}
                              size={40}
                              label={t('levelSelect.unlockedLevelIcon')}
                            />
                          ) : (
                            <Lock className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div className={`text-xl font-black ${unlocked ? 'text-white' : 'text-white/45'}`}>
                          {t(level.nameKey)}
                        </div>
                        <p className={`mt-2 text-sm leading-6 ${unlocked ? 'text-white/65' : 'text-white/35'}`}>
                          {t('levelSelect.levelMeta', {
                            rows: level.rows,
                            cols: level.cols,
                            time: level.timeLimit,
                          })}
                        </p>
                        <div className="mt-4 rounded-2xl bg-black/20 px-3 py-2 text-xs leading-5 text-white/72">
                          {t('levelSelect.missionMeta', {
                            score: level.mission.scoreTarget,
                            combo: level.mission.comboTarget,
                          })}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-8 rounded-[28px] bg-white/8 p-5 backdrop-blur">
          <h3 className="mb-2 font-bold text-white">{t('levelSelect.rulesTitle')}</h3>
          <ul className="space-y-1 text-sm text-white/70">
            <li>{`• ${t('levelSelect.rules.first')}`}</li>
            <li>{`• ${t('levelSelect.rules.second')}`}</li>
            <li>{`• ${t('levelSelect.rules.third')}`}</li>
            <li>{`• ${t('levelSelect.rules.fourth')}`}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
