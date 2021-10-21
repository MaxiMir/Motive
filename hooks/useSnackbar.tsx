import { useContext } from 'react'
import { ContextSnackbarProps, SnackbarContext } from 'context/snackbarContext'
import useDebounceCb from './useDebounceCb'

export interface UseSnackbar {
  id?: number
  enqueueSnackbar: (props: ContextSnackbarProps) => void
  closeSnackbar: () => void
}

export const useSnackbar = (): UseSnackbar => {
  const { props, setProps } = useContext(SnackbarContext)
  const enqueueSnackbar = useDebounceCb(changeProps, 250)

  function changeProps(propsNew: ContextSnackbarProps) {
    props && setProps(null)
    setProps(propsNew)
  }

  const closeSnackbar = () => setProps(null)

  return {
    enqueueSnackbar,
    closeSnackbar,
  }
}
