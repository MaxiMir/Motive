import { FC, Fragment } from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'

const DialogActions = dynamic(() => import('@material-ui/core/DialogActions'))
const AppBox = dynamic(() => import('./AppBox'))

interface AppModalProps {
  title: string
  onClose: () => void
  actions?: JSX.Element[]
}

const AppModal: FC<AppModalProps> = ({ title, actions, children, onClose }) => {
  const classes = useStyles()

  return (
    <Dialog classes={{ root: classes.root, paper: classes.paper }} open fullWidth onClose={onClose}>
      <DialogTitle className={classes.title}>{title}</DialogTitle>
      <DialogContent className={classes.content}>{children}</DialogContent>
      {actions && (
        <DialogActions>
          <AppBox flexGrow={1} justifyContent="space-between" pb={1}>
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
    padding: '16px 16px 24px',
    paddingBottom: 24,
  },
})

export default AppModal
