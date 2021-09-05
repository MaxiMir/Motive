import { useContext } from 'react'
import { ContextSnackbarProps, SnackbarContext } from 'context/snackbarContext'

export interface UseSnackbar {
  enqueueSnackbar: (props: ContextSnackbarProps) => void
  closeSnackbar: () => void
}

export const useSnackbar = (): UseSnackbar => {
  const { props, setProps } = useContext(SnackbarContext)

  return {
    enqueueSnackbar: (newProps: ContextSnackbarProps) => {
      props && setProps(null)
      setTimeout(() => setProps(newProps), !props ? 0 : 500)
    },
    closeSnackbar: () => setProps(null),
  }
}
