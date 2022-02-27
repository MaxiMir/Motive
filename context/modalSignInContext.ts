import { createContext } from 'react'
import { Provider } from 'next-auth/providers'

export interface ModalSignInContextType {
  open: boolean
  providers: Record<string, Provider> | null
  toggle: () => void
}

export const ModalSignInContext = createContext<ModalSignInContextType>({
  open: false,
  providers: null,
  toggle: () => false,
})
