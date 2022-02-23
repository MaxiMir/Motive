import { FC, Fragment } from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogContent, DialogProps, DialogTitle } from '@material-ui/core'

const DialogActions = dynamic(() => import('@material-ui/core/DialogActions'))
const AppBox = dynamic(() => import('./AppBox'))

interface AppModalProps {
  title: JSX.Element | string
  maxWidth?: DialogProps['maxWidth']
  actions?: JSX.Element[]
  onClose: () => void
}

const AppModal: FC<AppModalProps> = ({ title, actions, maxWidth, children, onClose }) => {
  const classes = useStyles()

  return (
    <Dialog classes={{ root: classes.root, paper: classes.paper }} open fullWidth maxWidth={maxWidth} onClose={onClose}>
      <DialogTitle className={classes.title}>{title}</DialogTitle>
      <DialogContent className={classes.content}>{children}</DialogContent>
      {actions && (
        <DialogActions>
          <AppBox flex={1} justifyContent="space-between" pb={2} px={1}>
            {actions.map((a, key) => (
              <Fragment key={key}>{a}</Fragment>
            ))}
          </AppBox>
        </DialogActions>
      )}
    </Dialog>
  )
}

const useStyles = makeStyles({
  root: {
    '@global': {
      '.MuiBackdrop-root': {
        background: 'rgba(34, 34, 34, 0.75)',
        backdropFilter: 'blur(10px)',
      },
    },
  },
  paper: {
    border: '1px solid #F5F5F7',
    borderRadius: 10,
    margin: 16,
    width: 'calc(100% - 16px)',
  },
  title: {
    padding: '24px 16px 0',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  content: {
    paddingBottom: 24,
    overflow: 'scroll',
  },
})

export default AppModal
