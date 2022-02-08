import { SyntheticEvent } from 'react'
import dynamic from 'next/dynamic'
import { Snackbar, SnackbarProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert, { AlertProps } from '@material-ui/lab/Alert'
import { AppEmojiName } from './AppEmoji'

const AppEmoji = dynamic(() => import('./AppEmoji'))

export interface AppSnackbarProps {
  severity: AlertProps['severity']
  icon?: AppEmojiName
  action?: SnackbarProps['action']
  message?: string
  onClose: () => void
}

export default function AppSnackbar({ icon, message, severity, onClose, ...props }: AppSnackbarProps): JSX.Element {
  const classes = useStyles()
  const iconContent = getIconContent()
  const messageContent = getMessageContent()

  const handleClose = (_event?: SyntheticEvent, reason?: string) => reason !== 'clickaway' && onClose()

  function getIconContent() {
    if (severity === 'error') {
      return <AppEmoji name="error" onlyEmoji />
    }

    return icon && <AppEmoji name={icon} onlyEmoji />
  }

  function getMessageContent() {
    if (severity === 'error' && !message) {
      return 'Something went wrong...'
    }

    return message
  }

  return (
    <Snackbar open className={classes.root} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        {...props}
        icon={iconContent}
        className={classes.alert}
        severity={severity}
        color={severity === 'success' ? 'info' : undefined}
      >
        {messageContent}
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
