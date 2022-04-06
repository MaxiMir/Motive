import { IconButton, IconButtonProps, TypographyProps, useTheme } from '@mui/material'
import AppIcon from './AppIcon'

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
  const theme = useTheme()

  return (
    <IconButton
      aria-controls={ariaControls}
      aria-haspopup="true"
      sx={{
        color: theme.palette.secondary.main,
        padding: '3px',
        fontSize: !compact ? undefined : 18,
      }}
      {...restProps}
    >
      <AppIcon name={`more_${horizontal ? 'horiz' : 'vert'}`} />
    </IconButton>
  )
}
