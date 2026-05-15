import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.qiujun.linkgame',
  appName: 'Pet Link Up',
  webDir: 'dist',
  bundledWebRuntime: false,
  ios: {
  contentInset: 'never',
  scrollEnabled: false,
  },
};

export default config;
