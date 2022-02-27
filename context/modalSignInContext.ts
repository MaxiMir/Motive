import { createContext } from 'react'
import { SignInOptions } from 'next-auth/react'
import { Provider } from 'next-auth/providers'

export interface ModalSignInContextType {
  options?: SignInOptions
  providers: Record<string, Provider> | null
  setOptions: (options: SignInOptions) => void
}

export const ModalSignInContext = createContext<ModalSignInContextType>({
  providers: null,
  setOptions: () => false,
})
