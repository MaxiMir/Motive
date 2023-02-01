import { SignInOptions } from 'next-auth/react'
import { createContext, useContext } from 'react'

type SignInContextType = (options: SignInOptions) => void

export const SignInContext = createContext<SignInContextType>(() => false)

export const useOpenSignIn = () => {
  return useContext(SignInContext)
}
