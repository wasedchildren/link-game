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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950">
      <GameHeader />
      <GameBoard />
      <PauseModal />
    </div>
  );
}
