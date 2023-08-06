export const ONLINE_SKILLS_MAIN = ['completed', 'abandoned', 'followers', 'following'] as const

export const ONLINE_SKILLS = [
  ...ONLINE_SKILLS_MAIN,
  'progress',
  'points',
  'nextLevelPoints',
] as const

export type OnlineSkillName = (typeof ONLINE_SKILLS)[number]
