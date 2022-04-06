import { SyntheticEvent } from 'react'
import dynamic from 'next/dynamic'
import { Snackbar, SnackbarProps } from '@mui/material'
import Alert, { AlertProps } from '@mui/material/Alert'
import { SnackbarCloseReason } from '@mui/material/Snackbar/Snackbar'
import { AppEmojiName } from './AppEmoji'

const AppEmoji = dynamic(() => import('./AppEmoji'))

export interface AppSnackbarProps {
  severity: AlertProps['severity']
  icon?: AppEmojiName
  action?: SnackbarProps['action']
  message: string
  onClose: () => void
}

export default function AppSnackbar({ icon, message, severity, onClose, ...props }: AppSnackbarProps): JSX.Element {
  const iconContent = getIconContent()

  const handleClose = (_event: SyntheticEvent | Event, reason: SnackbarCloseReason) =>
    reason !== 'clickaway' && onClose()

  function getIconContent() {
    if (severity === 'error') {
      return <AppEmoji name="error" onlyEmoji />
    }

    return icon && <AppEmoji name={icon} onlyEmoji />
  }

  return (
    <Snackbar
      open
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        bottom: {
          xs: 100,
        },
      }}
      onClose={handleClose}
    >
      <Alert icon={iconContent} severity={severity} {...props}>
        {message}
      </Alert>
    </Snackbar>
  )
}
