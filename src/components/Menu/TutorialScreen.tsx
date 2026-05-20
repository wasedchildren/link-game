import { useGameStore } from '@/store/gameStore';
import { soundManager } from '@/game/systems/SoundManager';
import { Compass, Gem, Sparkles, TimerReset, WandSparkles } from 'lucide-react';
import { SpriteIcon } from '@/components/ui/SpriteIcon';
import { useI18n } from '@/i18n';

const tutorialSteps = [
  { icon: Compass, titleKey: 'tutorial.steps.step1.title', bodyKey: 'tutorial.steps.step1.body' },
  { icon: Sparkles, titleKey: 'tutorial.steps.step2.title', bodyKey: 'tutorial.steps.step2.body' },
  { icon: WandSparkles, titleKey: 'tutorial.steps.step3.title', bodyKey: 'tutorial.steps.step3.body' },
  { icon: TimerReset, titleKey: 'tutorial.steps.step4.title', bodyKey: 'tutorial.steps.step4.body' },
];

export function TutorialScreen() {
  const { setScene, startLevel } = useGameStore();
  const { t } = useI18n();

  const handleBack = () => {
    soundManager.playClick();
    setScene('menu');
  };

  const handleStartPractice = () => {
    soundManager.playClick();
    startLevel(1);
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),linear-gradient(180deg,_#150a2d_0%,_#12051d_100%)] px-4 pb-8 pt-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="rounded-[32px] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur">
          <div className="mb-5 flex items-center justify-between gap-4">
            <button
              onClick={handleBack}
              className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/14 hover:text-white"
            >
              {t('common.back')}
            </button>
            <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
              {t('tutorial.label')}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h1 className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl">
                {t('tutorial.title')}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
                {t('tutorial.summary')}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100">
                  {t('tutorial.badges.badge1')}
                </div>
                <div className="rounded-full border border-amber-300/20 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100">
                  {t('tutorial.badges.badge2')}
                </div>
                <div className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-2 text-sm font-semibold text-fuchsia-100">
                  {t('tutorial.badges.badge3')}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-950/35 p-5">
              <div className="mb-4 flex items-center gap-4">
                <div className="rounded-2xl bg-gradient-to-br from-amber-300 to-rose-500 p-3 shadow-lg shadow-rose-900/30">
                  <SpriteIcon icon={8} size={44} label={t('tutorial.previewIconLabel')} />
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-100/80">
                    {t('tutorial.previewEyebrow')}
                  </div>
                  <div className="text-2xl font-black text-white">{t('tutorial.previewTitle')}</div>
                </div>
              </div>
              <ul className="space-y-3 text-sm leading-6 text-white/72">
                <li>{t('tutorial.previewPoints.point1')}</li>
                <li>{t('tutorial.previewPoints.point2')}</li>
                <li>{t('tutorial.previewPoints.point3')}</li>
              </ul>
              <button
                onClick={handleStartPractice}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 px-5 py-4 text-base font-black text-slate-950 transition hover:scale-[1.01]"
              >
                <Gem className="h-5 w-5" />
                {t('tutorial.startPractice')}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {tutorialSteps.map(({ icon: Icon, titleKey, bodyKey }, index) => (
            <div
              key={titleKey}
              className="rounded-[28px] border border-white/10 bg-white/6 p-5 shadow-lg backdrop-blur"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-2xl bg-white/10 p-3 text-cyan-100">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/35">
                  0{index + 1}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">{t(titleKey)}</h2>
              <p className="mt-3 text-sm leading-6 text-white/70">{t(bodyKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
