import { soundManager } from '@/game/systems/SoundManager';

const RESUME_EVENTS = ['pointerdown', 'touchstart', 'keydown'] as const;

export function setupMobileAudio() {
  let removed = false;

  const resumeAudio = () => {
    void soundManager.resumeContext();
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      resumeAudio();
    }
  };

  RESUME_EVENTS.forEach((eventName) => {
    window.addEventListener(eventName, resumeAudio, { passive: true });
  });
  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    if (removed) return;
    removed = true;
    RESUME_EVENTS.forEach((eventName) => {
      window.removeEventListener(eventName, resumeAudio);
    });
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}
