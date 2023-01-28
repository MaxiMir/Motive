import { createContext, useContext } from 'react'
import { SnackbarState } from 'entities/snackbar/types'

interface SnackbarContextType {
  state: SnackbarState | null
  setState: (props: SnackbarState | null) => void
}

export const SnackbarContext = createContext<SnackbarContextType>({
  state: null,
  setState: (_: SnackbarState | null) => undefined,
})

export const useSnackbar = () => {
  const { state, setState } = useContext(SnackbarContext)

  function enqueueSnackbar(values: SnackbarState) {
    state && setState(null)
    setTimeout(() => setState(values), 300)
  }

  const closeSnackbar = () => setState(null)

  return { enqueueSnackbar, closeSnackbar } as const
}
