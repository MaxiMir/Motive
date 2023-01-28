import { SignInOptions } from 'next-auth/react'
import { createContext } from 'react'
import { Providers } from 'features/sign-in/types'

export interface SignInContextType {
  providers: Providers
  setOptions: (options: SignInOptions) => void
}

export const SignInContext = createContext<SignInContextType>({
  providers: null,
  setOptions: () => false,
})
