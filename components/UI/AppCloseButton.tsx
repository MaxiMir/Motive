import { IconButton, IconButtonProps, createStyles, makeStyles } from '@material-ui/core'
import AppIcon from './AppIcon'

type AppCloseButtonProps = Omit<IconButtonProps, 'className' | 'disableFocusRipple' | 'childen'>

export default function AppCloseButton(props: AppCloseButtonProps): JSX.Element {
  const classes = useStyles()

  return (
    <IconButton disableFocusRipple {...props} className={classes.iconCloseBtn}>
      <AppIcon name="close" />
    </IconButton>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    iconCloseBtn: {
      color: theme.text.silent,
    },
  }),
)
