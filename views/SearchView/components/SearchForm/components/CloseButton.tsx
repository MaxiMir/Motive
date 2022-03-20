import { IconButton, makeStyles } from '@material-ui/core'
import AppIcon from 'components/UI/AppIcon'

export default function CloseButton(): JSX.Element {
  const classes = useStyles()

  return (
    <IconButton disableFocusRipple className={classes.button}>
      <AppIcon name="close" />
    </IconButton>
  )
}

const useStyles = makeStyles({
  button: {
    '&:hover': {
      background: 'none',
    },
  },
})
