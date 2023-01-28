import { useContext } from 'react'
import { SnackbarContext } from 'entities/snackbar/lib/context'
import { SnackbarState } from 'entities/snackbar/types'

export const useSnackbar = () => {
  const { state, setState } = useContext(SnackbarContext)

  function enqueueSnackbar(values: SnackbarState) {
    state && setState(null)
    setTimeout(() => setState(values), 300)
  }

  const closeSnackbar = () => setState(null)

  return { enqueueSnackbar, closeSnackbar } as const
}
