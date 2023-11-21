import { useRef } from 'react'
import { useSnackbarStore } from './model'
import { AlertProps } from './types'

export function useSnackbar() {
  const rafIdRef = useRef(0)
  const { open, openSnackbar, closeSnackbar } = useSnackbarStore()

  function enqueueSnackbar(message: string, options: Omit<AlertProps, 'children'>) {
    open && closeSnackbar()
    cancelAnimationFrame(rafIdRef.current)

    rafIdRef.current = requestAnimationFrame(() => {
      openSnackbar({ ...options, children: message })
    })
  }

  return { enqueueSnackbar, closeSnackbar }
}
