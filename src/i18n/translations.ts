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
      brandEyebrow: 'Original rescue puzzle adventure',
      tagline:
        'Guide rescued pets across themed puzzle trails with handcrafted stages, combo missions, and strategic helper tools.',
      instructions:
        'Tap matching icons, plan around mission goals, and use tools wisely to rescue every chapter crew.',
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
    audio: {
      bgmOn: 'Music On',
      bgmOff: 'Music Off',
      turnOnBgm: 'Turn On Music',
      turnOffBgm: 'Turn Off Music',
    },
    menu: {
      startAdventure: 'Start Adventure',
      openTutorial: 'Open Tutorial',
      featuredJourney: 'Featured journey',
      progressLabel: 'Journey progress',
      progressHint: 'Unlock chapters and complete mission stars.',
      chaptersLabel: 'Chapters opened',
      chapterHint: 'Each chapter adds tougher rescue routes.',
      economyHint: 'Use coins to show the growing rescue caravan.',
      starsHint: 'Mission stars prove you mastered each stage.',
      featurePanelTitle: 'Why it stands out',
      featurePanelPoint1: 'Mission-based stage goals',
      featurePanelPoint2: 'Combo scoring and helper tools',
      featurePanelPoint3: 'Four themed rescue chapters',
      tutorialCardTitle: 'Learn the rescue rules',
      tutorialCardBody:
        'See how turns, missions, combos, and helper tools work before you jump into the journey.',
    },
    levelSelect: {
      title: 'Choose Your Chapter',
      subtitle:
        'Each chapter introduces tougher rescue routes, bigger boards, and higher mission demands.',
      unlockedLevelIcon: 'Unlocked level',
      chapterOpen: 'Chapter open',
      chapterLocked: 'Locked chapter',
      levelMeta: '{{rows}} x {{cols}} board • {{time}}s timer',
      missionMeta: 'Mission: {{score}} score + combo {{combo}}',
      rulesTitle: 'How to Play',
      rules: {
        first: 'Match two identical icons',
        second: 'The path can have at most two turns',
        third: 'Clear all icons before time runs out while chasing mission goals',
        fourth: 'Use hints and shuffles to keep your rescue streak alive',
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
      missionTitle: 'Mission report',
      missionScoreTarget: 'Reach score {{score}}',
      missionComboTarget: 'Reach combo {{combo}}',
      completed: 'Completed',
      notCompleted: 'Pending',
      bestCombo: 'Best combo',
      missionReward: 'Reward earned',
      timeLeft: 'Time left',
      reviewTips: 'Review Tips',
    },
    pause: {
      title: 'Paused',
      resume: 'Resume',
      backToLevelSelect: 'Level Select',
      backToHome: 'Back to Home',
      missionSummary: 'Mission target: score {{score}} and combo {{combo}}',
      currentComboBest: 'Best combo this run: {{combo}}',
    },
    tutorial: {
      label: 'Tutorial',
      title: 'Master the rescue trails before your first run',
      summary:
        'Pet Link Up is no longer just a simple tile match. Every chapter has a rescue theme, every stage has mission goals, and each helper tool should be timed carefully.',
      badges: {
        badge1: 'Two-turn linking',
        badge2: 'Mission scoring',
        badge3: 'Hint and shuffle tools',
      },
      previewIconLabel: 'Tutorial preview icon',
      previewEyebrow: 'Practice route',
      previewTitle: 'Chapter 1 warm-up',
      previewPoints: {
        point1: 'Start in the Lantern Garden to learn the rescue flow.',
        point2: 'Watch your combo window to multiply score quickly.',
        point3: 'Use the hint and shuffle tools when the board gets crowded.',
      },
      startPractice: 'Start Practice Run',
      steps: {
        step1: {
          title: 'Trace a clear path',
          body: 'Two matching icons only connect when the line uses no more than two turns. Clear lanes early so later matches stay open.',
        },
        step2: {
          title: 'Play for the mission',
          body: 'Each stage asks for a score target and a combo target. Beating both earns bonus rewards and an extra mission star.',
        },
        step3: {
          title: 'Use your helper tools',
          body: 'Hints highlight a valid pair and shuffles rearrange all unmatched tiles. Save them for the toughest layouts.',
        },
        step4: {
          title: 'Finish with momentum',
          body: 'Fast consecutive matches build a combo streak. Keep the rescue streak alive to raise your score before the timer expires.',
        },
      },
    },
    game: {
      iconLabel: 'Game icon',
      missionTitle: 'Stage mission',
      missionSummary: 'Reach {{score}} score and combo {{combo}} to complete the rescue mission.',
      comboState: 'Current combo: {{combo}} • Best combo: {{best}}',
      toolsRemaining: '{{count}} left',
      tools: {
        hint: 'Hint',
        shuffle: 'Shuffle',
      },
    },
    levels: {
      level1: 'Lantern Garden',
      level2: 'Koi Bridge',
      level3: 'Firefly Steps',
      level4: 'Bloom Terrace',
      level5: 'Sunrise Pavilion',
      level6: 'Mossy Crossing',
      level7: 'Lagoon Boardwalk',
      level8: 'Coral Bend',
      level9: 'Sea Glass Wharf',
      level10: 'Harbor Echo',
      level11: 'Moonrise Yard',
      level12: 'Comet Arcade',
      level13: 'Neon Boardwalk',
      level14: 'Starlight Tunnels',
      level15: 'Skyline Switchback',
      level16: 'Crystal Canopy',
      level17: 'Meteor Orchard',
      level18: 'Aurora Lifts',
      level19: 'Dreampath Spiral',
      level20: 'Constellation Gate',
    },
    chapters: {
      chapter1: {
        name: 'Lantern Garden',
        theme: 'Warm-up chapter',
        summary:
          'Ease into the rescue caravan with compact boards, quick missions, and bright garden landmarks.',
      },
      chapter2: {
        name: 'Tidal Boardwalk',
        theme: 'Coastal chapter',
        summary:
          'The board widens and routes get trickier as the caravan crosses sea bridges and coral lanes.',
      },
      chapter3: {
        name: 'Midnight Avenue',
        theme: 'City lights chapter',
        summary:
          'Night rescue routes demand stronger combo play, longer planning, and sharper mission pacing.',
      },
      chapter4: {
        name: 'Starfall Heights',
        theme: 'Finale chapter',
        summary:
          'End the journey in skybound routes with the biggest boards and the most demanding mission goals.',
      },
    },
  },
  'zh-CN': {
    app: {
      name: '萌宠连连看',
      shortName: '连连看',
      brandEyebrow: '原创萌宠救援解谜冒险',
      tagline:
        '带领萌宠穿越主题章节，在手工设计的棋盘里完成任务、打出连击，并合理使用辅助道具。',
      instructions:
        '点击相同图标完成连线，在通关之外追求任务目标，逐步完成整段救援旅程。',
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
    audio: {
      bgmOn: '音乐已开',
      bgmOff: '音乐已关',
      turnOnBgm: '打开背景音乐',
      turnOffBgm: '关闭背景音乐',
    },
    menu: {
      startAdventure: '开始冒险',
      openTutorial: '打开教程',
      featuredJourney: '当前旅程',
      progressLabel: '旅程进度',
      progressHint: '解锁章节并完成任务星级。',
      chaptersLabel: '已开启章节',
      chapterHint: '每个章节都会带来更复杂的救援路线。',
      economyHint: '金币会随着你的救援旅程不断积累。',
      starsHint: '任务星星代表你对关卡的掌控程度。',
      featurePanelTitle: '核心特色',
      featurePanelPoint1: '任务驱动的关卡目标',
      featurePanelPoint2: '连击计分与辅助道具',
      featurePanelPoint3: '四个主题救援章节',
      tutorialCardTitle: '先学会救援规则',
      tutorialCardBody: '先了解转弯规则、任务目标、连击机制和辅助道具，再进入正式冒险。',
    },
    levelSelect: {
      title: '选择章节',
      subtitle:
        '每个章节都会加入更复杂的棋盘、更高的任务目标和更紧张的救援路线。',
      unlockedLevelIcon: '已解锁关卡',
      chapterOpen: '章节已开启',
      chapterLocked: '章节未开启',
      levelMeta: '{{rows}} x {{cols}} 棋盘 • {{time}} 秒',
      missionMeta: '任务：{{score}} 分 + {{combo}} 连击',
      rulesTitle: '玩法说明',
      rules: {
        first: '点击两个相同图标进行配对',
        second: '连线路径最多只能转弯两次',
        third: '在倒计时结束前清空棋盘并尽量完成任务目标',
        fourth: '提示与洗牌道具能帮助你维持救援节奏',
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
      missionTitle: '任务结算',
      missionScoreTarget: '达到 {{score}} 分',
      missionComboTarget: '完成 {{combo}} 连击',
      completed: '已完成',
      notCompleted: '未完成',
      bestCombo: '最佳连击',
      missionReward: '本局奖励',
      timeLeft: '剩余时间',
      reviewTips: '查看技巧',
    },
    pause: {
      title: '游戏暂停',
      resume: '继续游戏',
      backToLevelSelect: '返回选关',
      backToHome: '返回主页',
      missionSummary: '当前任务：达到 {{score}} 分，并完成 {{combo}} 连击',
      currentComboBest: '本局最佳连击：{{combo}}',
    },
    tutorial: {
      label: '教程',
      title: '先掌握救援路线，再开始第一段冒险',
      summary:
        '《萌宠连连看》不再只是简单配对。每个章节都有自己的救援主题，每个关卡都有任务目标，道具的使用时机也会影响你的最终表现。',
      badges: {
        badge1: '两次转弯规则',
        badge2: '任务型计分',
        badge3: '提示与洗牌道具',
      },
      previewIconLabel: '教程预览图标',
      previewEyebrow: '练习路线',
      previewTitle: '第一章热身',
      previewPoints: {
        point1: '从灯庭章节开始，熟悉整个救援流程。',
        point2: '注意连击窗口，连续成功配对可以快速提高分数。',
        point3: '当棋盘变复杂时，合理使用提示和洗牌道具。',
      },
      startPractice: '开始练习',
      steps: {
        step1: {
          title: '先看清路径',
          body: '两个相同图标只有在连线不超过两次转弯时才能消除。优先清出通路，后续才更容易连续配对。',
        },
        step2: {
          title: '别只顾着通关',
          body: '每关除了通关，还要尽量完成分数目标和连击目标。全部达成才能拿到更高奖励。',
        },
        step3: {
          title: '善用辅助道具',
          body: '提示会高亮一组可消除图标，洗牌会重新排列未消除图块。把它们留给最困难的时刻。',
        },
        step4: {
          title: '保持节奏冲高分',
          body: '快速连续消除可以形成连击。维持连击节奏，才能在倒计时结束前拿到更高分。',
        },
      },
    },
    game: {
      iconLabel: '游戏图标',
      missionTitle: '关卡任务',
      missionSummary: '达到 {{score}} 分并完成 {{combo}} 连击，即可完成本关救援任务。',
      comboState: '当前连击：{{combo}} • 最佳连击：{{best}}',
      toolsRemaining: '剩余 {{count}} 次',
      tools: {
        hint: '提示',
        shuffle: '洗牌',
      },
    },
    levels: {
      level1: '灯庭小径',
      level2: '锦鲤小桥',
      level3: '流萤台阶',
      level4: '花海露台',
      level5: '晨光亭阁',
      level6: '苔痕渡口',
      level7: '海湾栈道',
      level8: '珊瑚弯角',
      level9: '海玻璃码头',
      level10: '回声港湾',
      level11: '月色庭院',
      level12: '彗光长街',
      level13: '霓虹栈桥',
      level14: '星夜通道',
      level15: '天际折返',
      level16: '水晶树冠',
      level17: '流星果园',
      level18: '极光升台',
      level19: '幻梦回旋',
      level20: '星群之门',
    },
    chapters: {
      chapter1: {
        name: '灯庭花园',
        theme: '热身章节',
        summary: '从紧凑的棋盘和清晰的任务开始，逐步熟悉整段萌宠救援旅程。',
      },
      chapter2: {
        name: '潮汐栈道',
        theme: '海岸章节',
        summary: '棋盘开始变宽，路径也更曲折，你需要更积极地利用连击和道具。',
      },
      chapter3: {
        name: '午夜长街',
        theme: '夜城章节',
        summary: '夜色中的救援路线更考验节奏与规划，任务目标也会明显提高。',
      },
      chapter4: {
        name: '星落高地',
        theme: '终章章节',
        summary: '在天空之上的终点关卡里，迎接最大的棋盘和最苛刻的任务条件。',
      },
    },
  },
};
