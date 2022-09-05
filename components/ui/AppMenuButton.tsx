import { IconButton, IconButtonProps, TypographyProps } from '@mui/material'
import AppIcon from './AppIcon'

type AppMenuButtonProps = Pick<IconButtonProps, 'title' | 'onClick'> & {
  ariaControls: string
  color?: TypographyProps['color']
  horizontal?: boolean
  compact?: boolean
}

export default function AppMenuButton({ ariaControls, color, horizontal, compact, ...restProps }: AppMenuButtonProps) {
  return (
    <IconButton
      aria-controls={ariaControls}
      aria-haspopup="true"
      sx={{
        color: 'secondary.main',
        padding: '3px',
        fontSize: !compact ? undefined : 18,
      }}
      {...restProps}
    >
      <AppIcon name={`more_${horizontal ? 'horiz' : 'vert'}`} />
    </IconButton>
  )
}
