import { SnackbarProps } from 'shared/ui/Snackbar'

export type SnackbarState = Omit<SnackbarProps, 'onClose'>
