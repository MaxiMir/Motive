import { SyntheticEvent } from 'react'
import dynamic from 'next/dynamic'
import { Fade, Snackbar, SnackbarProps } from '@mui/material'
import Alert, { alertClasses } from '@mui/material/Alert'
import { teal } from '@mui/material/colors'
import { SnackbarCloseReason } from '@mui/material/Snackbar/Snackbar'
import { AppEmojiName } from './AppEmoji'

const AppEmoji = dynamic(() => import('./AppEmoji'))

export interface AppSnackbarProps {
  severity: 'success' | 'info' | 'warning' | 'error'
  icon?: AppEmojiName
  action?: SnackbarProps['action']
  message: string
  onClose: () => void
}

function AppSnackbar({ severity, icon, message, onClose, ...props }: AppSnackbarProps) {
  const iconFinal = severity === 'error' ? 'error' : icon

  const handleClose = (_event: SyntheticEvent | Event, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') return

    onClose()
  }

  return (
    <Snackbar
      open
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        [`& .${alertClasses.root}`]: {
          backgroundColor: severity === 'success' ? teal[900] : undefined,
          color: 'common.white',
        },
        [`& .${alertClasses.message}`]: {
          lineHeight: 1.9,
        },
        bottom: {
          xs: 80,
          lg: 24,
        },
      }}
      TransitionComponent={Fade}
      onClose={handleClose}
    >
      <Alert
        icon={iconFinal && <AppEmoji name={iconFinal} onlyEmoji />}
        severity={severity}
        {...props}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AppSnackbar
