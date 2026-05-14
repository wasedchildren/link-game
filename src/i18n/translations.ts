export const SUPPORTED_LANGUAGES = ['en', 'zh-CN'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

interface TranslationTree {
  [key: string]: string | TranslationTree;
}

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export const translations: Record<SupportedLanguage, TranslationTree> = {
  en: {
    app: {
      name: 'Pet Link Up',
      shortName: 'Link Up',
      tagline: 'Find matching icons and clear them by linking them together!',
      instructions:
        'Tap two matching icons. If they can be connected with no more than two turns, they will disappear!',
    },
    common: {
      back: 'Back',
      home: 'Home',
      coins: 'Coins',
      stars: 'Stars',
      score: 'Score',
      progress: 'Progress',
      nextLevel: 'Next Level',
      levelLabel: 'Level {{level}}',
    },
    menu: {
      startGame: 'Start Game',
      howToPlay: 'How to Play',
    },
    levelSelect: {
      title: 'Select Level',
      unlockedLevelIcon: 'Unlocked level',
      rulesTitle: 'How to Play',
      rules: {
        first: 'Match two identical icons',
        second: 'The path can have at most two turns',
        third: 'Clear all icons before time runs out',
        fourth: 'More time left means a higher score',
      },
    },
    result: {
      trophy: 'Victory trophy',
      winTitle: 'Level Cleared!',
      loseTitle: "Time's Up!",
      winMessage: 'You cleared level {{level}}',
      loseMessage: 'You did not finish in time',
      goToLevelSelect: 'Choose Level',
      backToHome: 'Back to Home',
    },
    pause: {
      title: 'Paused',
      resume: 'Resume',
      backToLevelSelect: 'Level Select',
      backToHome: 'Back to Home',
    },
    game: {
      iconLabel: 'Game icon',
    },
    levels: {
      level1: 'Getting Started',
      level2: 'Beginner Challenge',
      level3: 'Advanced Training',
      level4: 'Expert Climb',
      level5: 'Master Mode',
    },
  },
  'zh-CN': {
    app: {
      name: '萌宠连连看',
      shortName: '连连看',
      tagline: '找到相同的图标，用连线消除它们！',
      instructions:
        '点击两个相同的图标，如果可以用不超过两次转弯的线连接，它们就会消除！',
    },
    common: {
      back: '返回',
      home: '主页',
      coins: '金币',
      stars: '星星',
      score: '得分',
      progress: '进度',
      nextLevel: '下一关',
      levelLabel: '关卡 {{level}}',
    },
    menu: {
      startGame: '开始游戏',
      howToPlay: '游戏说明',
    },
    levelSelect: {
      title: '选择关卡',
      unlockedLevelIcon: '已解锁关卡',
      rulesTitle: '游戏规则',
      rules: {
        first: '点击两个相同的图标进行配对',
        second: '连线最多只能有两次转弯',
        third: '在时间结束前消除所有图标',
        fourth: '剩余时间越多，得分越高',
      },
    },
    result: {
      trophy: '胜利奖杯',
      winTitle: '恭喜过关！',
      loseTitle: '时间到！',
      winMessage: '成功完成关卡 {{level}}',
      loseMessage: '未能在时间内完成',
      goToLevelSelect: '选择关卡',
      backToHome: '返回主页',
    },
    pause: {
      title: '游戏暂停',
      resume: '继续游戏',
      backToLevelSelect: '返回选关',
      backToHome: '返回主页',
    },
    game: {
      iconLabel: '游戏图标',
    },
    levels: {
      level1: '新手入门',
      level2: '初级挑战',
      level3: '进阶训练',
      level4: '高手进阶',
      level5: '专家模式',
    },
  },
};
