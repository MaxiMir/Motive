import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { createStyles, IconButton, IconButtonProps } from '@material-ui/core'

type AppMenuButtonProps = Pick<IconButtonProps, 'title' | 'onClick'> & {
  ariaControls: string
  isHorizontal?: boolean
}

export default function AppMenuButton({ ariaControls, isHorizontal, ...restProps }: AppMenuButtonProps): JSX.Element {
  const classes = useStyles()

  return (
    <IconButton className={classes.button} aria-controls={ariaControls} aria-haspopup="true" {...restProps}>
      <span color="secondary" className={clsx('material-icons', classes.icon)}>
        more_{isHorizontal ? 'horiz' : 'vert'}
      </span>
    </IconButton>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      padding: 3,
    },
    icon: {
      color: theme.palette.warning.light,
    },
  }),
)
