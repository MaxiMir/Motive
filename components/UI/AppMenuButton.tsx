import { makeStyles } from '@material-ui/core/styles'
import { IconButton, IconButtonProps } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

type AppMenuButtonProps = Pick<IconButtonProps, 'title' | 'onClick'> & {
  ariaControls: string
}

export default function AppMenuButton({ ariaControls, ...restProps }: AppMenuButtonProps): JSX.Element {
  const classes = useStyles()

  return (
    <IconButton className={classes.button} aria-controls={ariaControls} aria-haspopup="true" {...restProps}>
      <MoreHorizIcon fontSize="small" color="secondary" className={classes.icon} />
    </IconButton>
  )
}

const useStyles = makeStyles({
  button: {
    padding: 3,
  },
  icon: {
    fontSize: '1.5rem',
  },
})
