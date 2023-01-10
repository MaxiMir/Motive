import { createContext } from 'react'
import { AppSnackbarProps } from '@ui/AppSnackbar'

export type SnackbarState = Omit<AppSnackbarProps, 'onClose'>

interface SnackbarContextType {
  state: SnackbarState | null
  setState: (props: SnackbarState | null) => void
}

export const SnackbarContext = createContext<SnackbarContextType>({
  state: null,
  setState: (_: SnackbarState | null) => undefined,
})
