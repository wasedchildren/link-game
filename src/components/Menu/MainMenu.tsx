import { useGameStore } from '@/store/gameStore';
import { CHAPTERS, LEVELS } from '@/game/config/GameConfig';
import { soundManager } from '@/game/systems/SoundManager';
import { BookOpen, Coins, Compass, Music2, Music4, Play, Sparkles, Star } from 'lucide-react';
import { SpriteIcon } from '@/components/ui/SpriteIcon';
import { useI18n } from '@/i18n';

export function MainMenu() {
  const { setScene, coins, stars, bgmEnabled, toggleBgm, unlockedLevels, unlockedChapters } =
    useGameStore();
  const { t } = useI18n();
  const journeyProgress = Math.round((unlockedLevels.length / LEVELS.length) * 100);
  const unlockedChapterCount = unlockedChapters.length;
  const featuredChapter = CHAPTERS[Math.max(0, unlockedChapterCount - 1)];

  const handleStart = () => {
    soundManager.playClick();
    setScene('level_select');
  };

  const handleOpenTutorial = () => {
    soundManager.playClick();
    setScene('tutorial');
  };

  const handleToggleBgm = () => {
    soundManager.playClick();
    const nextEnabled = !bgmEnabled;
    soundManager.setBgmEnabled(nextEnabled);
    toggleBgm();
  };

  return (
    <div className="relative flex min-h-full flex-col overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(244,114,182,0.18),_transparent_30%),radial-gradient(circle_at_left,_rgba(56,189,248,0.16),_transparent_32%),linear-gradient(180deg,_#14031f_0%,_#0b1220_100%)] px-4 pb-10 pt-16">
      <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
        <button
          onClick={handleToggleBgm}
          className="inline-flex items-center gap-2 rounded-full border border-purple-300/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
        >
          {bgmEnabled ? (
            <Music4 className="h-4 w-4 text-emerald-300" />
          ) : (
            <Music2 className="h-4 w-4 text-rose-300" />
          )}
          <span>{bgmEnabled ? t('audio.bgmOn') : t('audio.bgmOff')}</span>
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6">
        <section className="grid gap-6 rounded-[36px] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-amber-300/20 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">
                {t('app.brandEyebrow')}
              </div>
              <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl">
                {t('app.name')}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/72">{t('app.tagline')}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={handleStart}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 px-7 py-4 text-lg font-black text-white transition hover:scale-[1.01]"
              >
                <Play className="h-6 w-6 fill-current" />
                {t('menu.startAdventure')}
              </button>
              <button
                onClick={handleOpenTutorial}
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/8 px-6 py-4 text-lg font-bold text-white/88 transition hover:bg-white/14"
              >
                <BookOpen className="h-5 w-5" />
                {t('menu.openTutorial')}
              </button>
            </div>
          </div>

          <div className="rounded-[30px] bg-slate-950/40 p-5 shadow-lg">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                  {t('menu.featuredJourney')}
                </div>
                <div className="mt-2 text-2xl font-black text-white">{t(featuredChapter.nameKey)}</div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-amber-300 to-rose-500 p-3">
                <SpriteIcon icon={featuredChapter.mascotIcon} size={54} label={t('game.iconLabel')} />
              </div>
            </div>

            <p className="text-sm leading-7 text-white/70">{t(featuredChapter.summaryKey)}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/45">
                  {t('menu.progressLabel')}
                </div>
                <div className="mt-2 text-3xl font-black text-white">{journeyProgress}%</div>
                <div className="mt-2 text-sm text-white/60">{t('menu.progressHint')}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/45">
                  {t('menu.chaptersLabel')}
                </div>
                <div className="mt-2 text-3xl font-black text-white">
                  {unlockedChapterCount}/{CHAPTERS.length}
                </div>
                <div className="mt-2 text-sm text-white/60">{t('menu.chapterHint')}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/6 p-5 backdrop-blur">
            <div className="mb-3 flex items-center gap-3 text-amber-100">
              <Coins className="h-5 w-5 text-amber-300" />
              <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                {t('common.coins')}
              </span>
            </div>
            <div className="text-4xl font-black text-white">{coins}</div>
            <p className="mt-3 text-sm leading-6 text-white/65">{t('menu.economyHint')}</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/6 p-5 backdrop-blur">
            <div className="mb-3 flex items-center gap-3 text-violet-100">
              <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
              <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                {t('common.stars')}
              </span>
            </div>
            <div className="text-4xl font-black text-white">{stars}</div>
            <p className="mt-3 text-sm leading-6 text-white/65">{t('menu.starsHint')}</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/6 p-5 backdrop-blur">
            <div className="mb-3 flex items-center gap-3 text-cyan-100">
              <Sparkles className="h-5 w-5 text-cyan-300" />
              <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                {t('menu.featurePanelTitle')}
              </span>
            </div>
            <ul className="space-y-2 text-sm leading-6 text-white/70">
              <li>{t('menu.featurePanelPoint1')}</li>
              <li>{t('menu.featurePanelPoint2')}</li>
              <li>{t('menu.featurePanelPoint3')}</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <button
            onClick={handleOpenTutorial}
            className="rounded-[28px] border border-white/12 bg-gradient-to-br from-cyan-400/14 to-sky-500/10 p-5 text-left transition hover:border-cyan-300/25 hover:bg-cyan-400/16"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-2xl bg-cyan-400/12 p-3 text-cyan-100">
                <Compass className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                {t('tutorial.label')}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">{t('menu.tutorialCardTitle')}</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">{t('menu.tutorialCardBody')}</p>
          </button>

          {CHAPTERS.slice(0, 2).map((chapter) => (
            <button
              key={chapter.id}
              onClick={handleStart}
              className="rounded-[28px] border border-white/12 bg-white/6 p-5 text-left transition hover:border-white/20 hover:bg-white/10"
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`rounded-2xl bg-gradient-to-br ${chapter.accentFrom} ${chapter.accentTo} p-3 shadow-lg`}
                >
                  <SpriteIcon icon={chapter.mascotIcon} size={48} label={t('game.iconLabel')} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                  {t(chapter.themeKey)}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white">{t(chapter.nameKey)}</h2>
              <p className="mt-3 text-sm leading-7 text-white/70">{t(chapter.summaryKey)}</p>
            </button>
          ))}
        </section>

        <div className="pb-4 text-center text-sm text-white/35">
          <p>{t('app.instructions')}</p>
        </div>
      </div>
    </div>
  );
}
