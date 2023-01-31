import { Fade, Snackbar as MuiSnackbar, SnackbarProps as MuiSnackbarProps } from '@mui/material'
import Alert, { alertClasses } from '@mui/material/Alert'
import { teal } from '@mui/material/colors'
import { SnackbarCloseReason } from '@mui/material/Snackbar/Snackbar'
import { SyntheticEvent } from 'react'

export interface SnackbarProps {
  severity: 'success' | 'info' | 'warning' | 'error'
  icon?: string
  action?: MuiSnackbarProps['action']
  message: string
  onClose: () => void
}

function Snackbar({ severity, icon, message, onClose, ...props }: SnackbarProps) {
  const handleClose = (_event: SyntheticEvent | Event, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') return

    onClose()
  }

  return (
    <MuiSnackbar
      open
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        [`& .${alertClasses.root}`]: {
          color: 'common.white',
        },
        [`& .${alertClasses.standardSuccess}`]: {
          backgroundColor: teal[900],
        },
        [`& .${alertClasses.action}`]: {
          alignItems: 'center',
        },
        bottom: {
          xs: 80,
          lg: 24,
        },
      }}
      TransitionComponent={Fade}
      onClose={handleClose}
    >
      <Alert icon={icon} severity={severity} {...props}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}

export default Snackbar
