import { FC, SyntheticEvent } from 'react'
import { Slide, Snackbar, SnackbarProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert, { AlertProps } from '@material-ui/lab/Alert'
import { TransitionProps } from '@material-ui/core/transitions'

interface AppSnackbarProps {
  severity: AlertProps['severity']
  autoHideDuration: SnackbarProps['autoHideDuration']
  icon?: AlertProps['icon']
  action?: SnackbarProps['action']
  onClose: () => void
}

const AppSnackbar: FC<AppSnackbarProps> = ({ icon, autoHideDuration, children, onClose, ...restAlertProps }) => {
  const classes = useStyles()

  const handleClose = (_event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    onClose()
  }

  return (
    <Snackbar
      open
      className={classes.root}
      autoHideDuration={autoHideDuration}
      TransitionComponent={(props: TransitionProps) => <Slide {...props} direction="up" />}
      onClose={handleClose}
    >
      <Alert
        {...restAlertProps}
        icon={restAlertProps.severity === 'error' ? '❗' : icon}
        className={classes.alert}
        color={restAlertProps.severity === 'success' ? 'info' : undefined}
      >
        {children}
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
    '& .MuiAlert-icon': {
      animation: '$fadeWithBlur 0.7s cubic-bezier(0.55, 0.085, 0.68, 0.53) both',
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

export default AppSnackbar
