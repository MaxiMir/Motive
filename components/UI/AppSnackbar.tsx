import { SyntheticEvent } from 'react'
import { Snackbar, SnackbarProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert, { AlertProps } from '@material-ui/lab/Alert'

export interface AppSnackbarProps {
  severity: AlertProps['severity']
  icon?: AlertProps['icon']
  action?: SnackbarProps['action']
  message: string
  onClose: () => void
}

export default function AppSnackbar({ icon, message, onClose, ...restAlertProps }: AppSnackbarProps): JSX.Element {
  const classes = useStyles()

  const handleClose = (_event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    onClose()
  }

  return (
    <Snackbar open className={classes.root} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        {...restAlertProps}
        icon={restAlertProps.severity === 'error' ? '❗' : icon}
        className={classes.alert}
        color={restAlertProps.severity === 'success' ? 'info' : undefined}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

const useStyles = makeStyles({
  root: {
    bottom: 100,
  },
  alert: {
    lineHeight: '21px',
    '@media (max-width:365px)': {
      fontSize: '0.85rem',
    },
    '& .MuiAlert-icon': {
      display: 'flex',
      alignItems: 'center',
      animation: '$fadeWithBlur 0.7s cubic-bezier(0.55, 0.085, 0.68, 0.53) both',
    },
    '& .MuiAlert-action': {
      paddingLeft: 8,
    },
  },
  '@keyframes fadeWithBlur': {
    '0%': {
      filter: 'blur(12px)',
      opacity: 0,
    },
    '100%': {
      filter: 'blur(0px)',
      opacity: 1,
    },
  },
})
