import { FC, SyntheticEvent } from 'react'
import { Snackbar, SnackbarProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert, { AlertProps } from '@material-ui/lab/Alert'

interface AppSnackbarProps {
  severity: AlertProps['severity']
  autoHideDuration: SnackbarProps['autoHideDuration']
  icon?: AlertProps['icon']
  action?: SnackbarProps['action']
  onClose: () => void
}

const AppSnackbar: FC<AppSnackbarProps> = ({ autoHideDuration, severity, children, onClose, ...restAlertProps }) => {
  const classes = useStyles()

  const handleClose = (_event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    onClose()
  }

  return (
    <Snackbar open className={classes.root} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert
        {...restAlertProps}
        severity={severity}
        className={classes.alert}
        color={severity === 'success' ? 'info' : undefined}
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
    lineHeight: '19px',
  },
})

export default AppSnackbar
