import { useContext } from 'react'
import { ContextSnackbarProps, SnackbarContext } from '@context/snackbarContext'
import useDebounceCb from '@hooks/useDebounceCb'

type UseSnackbar = () => [enqueue: (t: ContextSnackbarProps) => void, close: () => void]

const useSnackbar: UseSnackbar = () => {
  const { props, setProps } = useContext(SnackbarContext)
  const enqueueSnackbar = useDebounceCb(changeProps, 250)

  function changeProps(propsNew: ContextSnackbarProps) {
    props && setProps(null)
    setTimeout(() => setProps(propsNew), 1)
  }

  const closeSnackbar = () => {
    setProps(null)
  }

  return [enqueueSnackbar, closeSnackbar]
}

export default useSnackbar