export const ONLINE_SCORE_MAIN = ['completed', 'abandoned', 'followers', 'following'] as const

export const ONLINE_SCORE = [
  ...ONLINE_SCORE_MAIN,
  'progress',
  'level',
  'points',
  'nextLevelPoints',
] as const

export type OnlineScoreName = (typeof ONLINE_SCORE)[number]

export const SPHERES_OF_LIFE = [
  'family',
  'friends',
  'health',
  'hobbies',
  'money',
  'vacation',
  'development',
  'work',
] as const

export type SphereOfLifeName = (typeof SPHERES_OF_LIFE)[number]
