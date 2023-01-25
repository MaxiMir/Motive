import { SignInOptions } from 'next-auth/react'
import { createContext } from 'react'
import { Providers } from '@entities/signin/model/types'

export interface SignInContextType {
  providers: Providers
  setOptions: (options: SignInOptions) => void
}

export const SignInContext = createContext<SignInContextType>({
  providers: null,
  setOptions: () => false,
})
