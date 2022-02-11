import { UserPageDto } from 'dto'

export type Context = { previous?: UserPageDto }

export const getTitle = (type: 'like' | 'support', like?: boolean): string =>
  type === 'like' ? `Like${!like ? '' : 'd'} the question` : `Mark${!like ? '' : 'ed'} as very helpful`
