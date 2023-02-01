import { DIAMETER } from './consts'

export const getOffset = (value: number) => {
  const rest = (value % 1) * 100

  return Math.round(((100 - Math.min(rest, 100)) / 100) * DIAMETER)
}
