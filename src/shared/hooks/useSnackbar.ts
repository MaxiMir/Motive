import { useContext } from 'react'
import { SnackbarState, SnackbarContext } from '@features/snackbar'

type UseSnackbarResult = [enqueue: (t: SnackbarState) => void, close: () => void]

const useSnackbar = (): UseSnackbarResult => {
  const { state, setState } = useContext(SnackbarContext)

  function changeProps(propsNew: SnackbarState) {
    state && setState(null)
    setTimeout(() => setState(propsNew), 100)
  }

  const closeSnackbar = () => setState(null)

  return [changeProps, closeSnackbar]
}

export default useSnackbar
