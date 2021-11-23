import clsx from 'clsx'
import { IconButton, IconButtonProps, TypographyProps, makeStyles } from '@material-ui/core'
import AppIconText from './AppIcon'

type AppMenuButtonProps = Pick<IconButtonProps, 'title' | 'onClick'> & {
  ariaControls: string
  color?: TypographyProps['color']
  horizontal?: boolean
  compact?: boolean
}

export default function AppMenuButton({
  ariaControls,
  color,
  horizontal,
  compact,
  ...restProps
}: AppMenuButtonProps): JSX.Element {
  const classes = useStyles()

  return (
    <IconButton className={classes.button} aria-controls={ariaControls} aria-haspopup="true" {...restProps}>
      <AppIconText color={color || 'secondary'} className={clsx([compact && classes.icon])}>
        more_{horizontal ? 'horiz' : 'vert'}
      </AppIconText>
    </IconButton>
  )
}

const useStyles = makeStyles({
  button: {
    padding: 3,
  },
  icon: {
    fontSize: 18,
  },
})
