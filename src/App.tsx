import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { MainMenu } from '@/components/Menu/MainMenu';
import { LevelSelect } from '@/components/Menu/LevelSelect';
import { GameScene } from '@/components/Game/GameScene';
import { ResultScreen } from '@/components/Menu/ResultScreen';
import { TutorialScreen } from '@/components/Menu/TutorialScreen';
import { soundManager } from '@/game/systems/SoundManager';
import { setupMobileAudio } from '@/utils/mobileAudio';
import { useI18n } from '@/i18n';

export default function App() {
  const { scene, bgmEnabled } = useGameStore();
  const { t } = useI18n();
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.title = t('app.name');
    const cleanupAudio = setupMobileAudio();
    soundManager.setBgmEnabled(bgmEnabled);
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      cleanupAudio();
      soundManager.stopBackgroundMusic();
    };
  }, [bgmEnabled, t]);
  
  return (
    <div className="app-shell">
      {scene === 'menu' && <MainMenu />}
      {scene === 'tutorial' && <TutorialScreen />}
      {scene === 'level_select' && <LevelSelect />}
      {scene === 'game' && <GameScene />}
      {scene === 'result' && <ResultScreen />}
    </div>
  );
}
