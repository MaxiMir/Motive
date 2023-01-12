import { AppSnackbarProps } from '@ui/AppSnackbar'

export type SnackbarState = Omit<AppSnackbarProps, 'onClose'>
