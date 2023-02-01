export const checkOnActive = (dayId: number, reactions?: number[]): boolean =>
  !!reactions?.some((d) => d === dayId)
