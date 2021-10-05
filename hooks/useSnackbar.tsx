import { useContext } from 'react'
import { ContextSnackbarProps, SnackbarContext } from 'context/snackbarContext'
import useDebounceCb from './useDebounceCb'

export interface UseSnackbar {
  enqueueSnackbar: (props: ContextSnackbarProps) => void
  closeSnackbar: () => void
}

export const useSnackbar = (): UseSnackbar => {
  const { props, setProps } = useContext(SnackbarContext)
  const enqueueSnackbar = useDebounceCb((newProps: ContextSnackbarProps) => {
    props && setProps(null)
    setProps(newProps)
  }, 250)

  return {
    enqueueSnackbar,
    closeSnackbar: () => setProps(null),
  }
}
