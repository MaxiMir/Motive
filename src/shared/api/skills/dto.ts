export const ONLINE_SCORE_MAIN = ['completed', 'abandoned', 'followers', 'following'] as const

export const ONLINE_SCORE = [
  ...ONLINE_SCORE_MAIN,
  'progress',
  'level',
  'points',
  'nextLevelPoints',
] as const

export type OnlineScoreName = (typeof ONLINE_SCORE)[number]
