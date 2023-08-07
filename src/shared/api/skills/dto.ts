export const ONLINE_INDEXES_MAIN = ['completed', 'abandoned', 'followers', 'following'] as const

export const ONLINE_INDEXES = [
  ...ONLINE_INDEXES_MAIN,
  'progress',
  'points',
  'nextLevelPoints',
] as const

export type OnlineIndexName = (typeof ONLINE_INDEXES)[number]
