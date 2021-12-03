import { createContext, Context } from 'react'

export const createGenericContext = <T extends unknown>(): Context<T | undefined> =>
  createContext<T | undefined>(undefined)
