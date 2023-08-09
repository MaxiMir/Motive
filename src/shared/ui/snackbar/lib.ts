import { useSnackbarStore } from './model'
import { AlertProps } from './types'

export function useSnackbar() {
  const { open, openSnackbar, closeSnackbar } = useSnackbarStore()

  function enqueueSnackbar(message: string, options: Omit<AlertProps, 'children'>) {
    open && closeSnackbar()
    setTimeout(() => openSnackbar({ ...options, children: message }), 300)
  }

  return { enqueueSnackbar, closeSnackbar }
}
