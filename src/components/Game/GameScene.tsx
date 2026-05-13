import { useGameStore } from '@/store/gameStore';
import { GameHeader } from './GameHeader';
import { GameBoard } from './GameBoard';
import { PauseModal } from './PauseModal';
import { useEffect, useRef } from 'react';

export function GameScene() {
  const { isPlaying, isPaused, updateTime } = useGameStore();
  const timerRef = useRef<number | null>(null);

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
    <div className="flex min-h-[100dvh] w-full flex-col items-center overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 px-3 py-4 sm:px-4">
      <GameHeader />
      <GameBoard />
      <PauseModal />
    </div>
  );
}
