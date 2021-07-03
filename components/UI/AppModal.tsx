import { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'

interface AppModalProps {
  title: string
  onClose: () => void
}

const AppModal: FC<AppModalProps> = ({ title, children, onClose }) => {
  const classes = useStyles()

  return (
    <Dialog open classes={{ root: classes.root, paper: classes.paper }} fullWidth onClose={onClose}>
      <DialogTitle className={classes.title}>{title}</DialogTitle>
      <DialogContent className={classes.content}>{children}</DialogContent>
    </Dialog>
  )
}

const useStyles = makeStyles({
  root: {
    '.MuiBackdrop-root': {
      background: 'rgba(34, 34, 34, 0.75)',
      backdropFilter: 'blur(10px)',
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
  },
  content: {
    padding: 16,
  },
})

export default AppModal
