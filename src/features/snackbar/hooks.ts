import { useContext } from 'react'
import { SnackbarContext } from './context'
import { SnackbarState } from './types'

type UseSnackbarResult = [enqueue: (t: SnackbarState) => void, close: () => void]

export const useSnackbar = (): UseSnackbarResult => {
  const { state, setState } = useContext(SnackbarContext)

  function enqueueSnackbar(propsNew: SnackbarState) {
    state && setState(null)
    setTimeout(() => setState(propsNew), 100)
  }

  const closeSnackbar = () => setState(null)

  return [enqueueSnackbar, closeSnackbar]
}
