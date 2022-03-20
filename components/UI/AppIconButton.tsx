import clsx from 'clsx'
import { IconButton, IconButtonProps, createStyles, makeStyles } from '@material-ui/core'
import AppIcon from './AppIcon'

type AppIconButtonProps = Omit<IconButtonProps, 'disableFocusRipple' | 'children'> & {
  name: string
}

export default function AppIconButton({ name, className, ...props }: AppIconButtonProps): JSX.Element {
  const classes = useStyles()

  return (
    <IconButton disableFocusRipple className={clsx([classes.button, className])} {...props}>
      <AppIcon name={name} />
    </IconButton>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      color: theme.text.silent,
    },
  }),
)
