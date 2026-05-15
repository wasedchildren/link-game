class SoundManager {
  private audioContext: AudioContext | null = null;
  private bgmSource: AudioBufferSourceNode | null = null;
  private isMuted = false;
  private isBgmEnabled = true;
  private bgmVolume = 0.25;
  private sfxVolume = 0.5;
  private bgmInterval: number | null = null;
  
  private initContext() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  async resumeContext() {
    const ctx = this.initContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
  }
  
  setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopBackgroundMusic();
    } else if (this.isBgmEnabled) {
      this.playBackgroundMusic();
    }
  }

  setBgmEnabled(enabled: boolean) {
    this.isBgmEnabled = enabled;

    if (!enabled) {
      this.stopBackgroundMusic();
      return;
    }

    if (!this.isMuted) {
      this.playBackgroundMusic();
    }
  }

  getBgmEnabled() {
    return this.isBgmEnabled;
  }
  
  setBgmVolume(volume: number) {
    this.bgmVolume = Math.max(0, Math.min(1, volume));
  }
  
  setSfxVolume(volume: number) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }
  
  playClick() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(this.sfxVolume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }
  
  playSelect() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.setValueAtTime(800, ctx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(this.sfxVolume * 0.7, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }
  
  playSuccess() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(this.sfxVolume * 0.5, ctx.currentTime + i * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);
      
      oscillator.start(ctx.currentTime + i * 0.1);
      oscillator.stop(ctx.currentTime + i * 0.1 + 0.3);
    });
  }
  
  playError() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.setValueAtTime(150, ctx.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(this.sfxVolume * 0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  }
  
  playLevelComplete() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    
    const notes = [523.25, 659.25, 783.99, 1046.50, 1244.51];
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(this.sfxVolume * 0.4, ctx.currentTime + i * 0.12);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.4);
      
      oscillator.start(ctx.currentTime + i * 0.12);
      oscillator.stop(ctx.currentTime + i * 0.12 + 0.4);
    });
  }
  
  playBackgroundMusic() {
    if (this.isMuted || !this.isBgmEnabled) return;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
    }
    
    const ctx = this.initContext();
    
    const melody = [
      523.25, 587.33, 659.25, 698.46, 783.99, 698.46, 659.25, 587.33,
      523.25, 587.33, 659.25, 783.99, 880.00, 783.99, 659.25, 523.25,
      587.33, 659.25, 587.33, 523.25, 493.88, 523.25, 587.33, 659.25,
      783.99, 880.00, 783.99, 659.25, 587.33, 523.25, 493.88, 440.00
    ];
    
    const bassLine = [
      130.81, 130.81, 164.81, 164.81,
      174.61, 174.61, 196.00, 196.00,
      130.81, 130.81, 164.81, 164.81,
      174.61, 174.61, 196.00, 196.00,
      146.83, 146.83, 174.61, 174.61,
      164.81, 164.81, 174.61, 174.61,
      130.81, 130.81, 164.81, 164.81,
      174.61, 174.61, 196.00, 196.00
    ];
    
    let melodyIndex = 0;
    let bassIndex = 0;
    
    const playNote = () => {
      if (this.isMuted || !this.isBgmEnabled) return;
      
      const melodyOsc = ctx.createOscillator();
      const melodyGain = ctx.createGain();
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      
      melodyOsc.connect(melodyGain);
      melodyGain.connect(ctx.destination);
      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);
      
      melodyOsc.frequency.setValueAtTime(melody[melodyIndex], ctx.currentTime);
      melodyOsc.type = 'square';
      melodyGain.gain.setValueAtTime(this.bgmVolume * 0.15, ctx.currentTime);
      melodyGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      melodyOsc.start(ctx.currentTime);
      melodyOsc.stop(ctx.currentTime + 0.25);
      
      if (melodyIndex % 2 === 0) {
        bassOsc.frequency.setValueAtTime(bassLine[bassIndex], ctx.currentTime);
        bassOsc.type = 'triangle';
        bassGain.gain.setValueAtTime(this.bgmVolume * 0.2, ctx.currentTime);
        bassGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        bassOsc.start(ctx.currentTime);
        bassOsc.stop(ctx.currentTime + 0.5);
        bassIndex = (bassIndex + 1) % bassLine.length;
      }
      
      melodyIndex = (melodyIndex + 1) % melody.length;
    };
    
    playNote();
    this.bgmInterval = window.setInterval(playNote, 300);
  }
  
  stopBackgroundMusic() {
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    if (this.bgmSource) {
      this.bgmSource.stop();
      this.bgmSource = null;
    }
  }
}

export const soundManager = new SoundManager();
