export const SCORE_MAIN = ['completed', 'abandoned', 'followers', 'following'] as const

export const SCORE = [...SCORE_MAIN, 'progress', 'points', 'nextLevelPoints'] as const

export type ScoreDto = (typeof SCORE)[number]

export const SPHERES = [
  'family',
  'friends',
  'health',
  'hobbies',
  'money',
  'vacation',
  'development',
  'work',
] as const

export type SphereDto = (typeof SPHERES)[number]
