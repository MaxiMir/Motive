import { create } from 'zustand'
import { AlertProps } from './types'

interface SnackbarStore {
  open: boolean
  alertProps: AlertProps | null
  openSnackbar: (props: AlertProps) => void
  closeSnackbar: () => void
}

export const useSnackbarStore = create<SnackbarStore>((set) => ({
  open: false,
  alertProps: null,
  openSnackbar: (alertProps) => set({ open: true, alertProps }),
  closeSnackbar: () => set({ open: false, alertProps: null }),
}))
