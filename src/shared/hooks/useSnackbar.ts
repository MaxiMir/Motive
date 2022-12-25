import { useContext } from 'react'
import { SnackbarProps, SnackbarContext } from '@features/snackbar'
import useDebounceCb from '@hooks/useDebounceCb'

type UseSnackbarResult = [enqueue: (t: SnackbarProps) => void, close: () => void]

const useSnackbar = (): UseSnackbarResult => {
  const { props, setProps } = useContext(SnackbarContext)
  const enqueueSnackbar = useDebounceCb(changeProps, 250)

  function changeProps(propsNew: SnackbarProps) {
    props && setProps(null)
    setTimeout(() => setProps(propsNew), 1)
  }

  const closeSnackbar = () => {
    setProps(null)
  }

  return [enqueueSnackbar, closeSnackbar]
}

export default useSnackbar
