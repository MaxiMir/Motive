export const ADVANTAGES = ['motivation', 'creativity', 'support', 'completed'] as const

export type AdvantageName = (typeof ADVANTAGES)[number]
