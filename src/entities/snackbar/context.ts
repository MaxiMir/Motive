import { createContext } from 'react'
import { SnackbarState } from '@entities/snackbar/types'

interface SnackbarContextType {
  state: SnackbarState | null
  setState: (props: SnackbarState | null) => void
}

export const SnackbarContext = createContext<SnackbarContextType>({
  state: null,
  setState: (_: SnackbarState | null) => undefined,
})
