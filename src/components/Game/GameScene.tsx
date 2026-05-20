import { useGameStore } from '@/store/gameStore';
import { getChapterByLevelId } from '@/game/config/GameConfig';
import { GameHeader } from './GameHeader';
import { GameBoard } from './GameBoard';
import { PauseModal } from './PauseModal';
import { useEffect, useRef } from 'react';

export function GameScene() {
  const { isPlaying, isPaused, updateTime, currentLevel } = useGameStore();
  const timerRef = useRef<number | null>(null);
  const currentChapter = getChapterByLevelId(currentLevel);
  const chapterSceneClass =
    currentChapter?.id === 1
      ? 'bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.16),_transparent_32%),linear-gradient(180deg,_#281037_0%,_#3d1242_48%,_#581c3d_100%)]'
      : currentChapter?.id === 2
        ? 'bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.16),_transparent_30%),linear-gradient(180deg,_#082032_0%,_#12304d_45%,_#0f4c5c_100%)]'
        : currentChapter?.id === 3
          ? 'bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.18),_transparent_34%),linear-gradient(180deg,_#111827_0%,_#1e1b4b_44%,_#312e81_100%)]'
          : 'bg-[radial-gradient(circle_at_top,_rgba(192,132,252,0.18),_transparent_34%),linear-gradient(180deg,_#1f1235_0%,_#312e81_45%,_#581c87_100%)]';

  useEffect(() => {
    if (isPlaying && !isPaused) {
      timerRef.current = window.setInterval(() => {
        updateTime();
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, isPaused, updateTime]);

  return (
    <div className={`flex min-h-[100dvh] w-full flex-col items-center overflow-hidden px-3 py-4 sm:px-4 ${chapterSceneClass}`}>
      <GameHeader />
      <GameBoard />
      <PauseModal />
    </div>
  );
}
