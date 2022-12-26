import { createContext } from 'react'
import { SignInOptions } from 'next-auth/react'
import { Provider } from 'next-auth/providers'

interface SignInModalContextType {
  options?: SignInOptions
  providers: Record<string, Provider> | null
  setOptions: (options: SignInOptions) => void
}

export const SignInModalContext = createContext<SignInModalContextType>({
  providers: null,
  setOptions: () => false,
})
