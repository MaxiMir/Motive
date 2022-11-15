import { IconButton, IconButtonProps, TypographyProps } from '@mui/material'
import AppIcon from './AppIcon'

type AppMenuButtonProps = Pick<IconButtonProps, 'title' | 'onClick'> & {
  ariaControls: string
  color?: TypographyProps['color']
  horizontal?: boolean
}

export default function AppMenuButton({
  ariaControls,
  color = 'secondary.main',
  horizontal,
  ...restProps
}: AppMenuButtonProps) {
  return (
    <IconButton aria-controls={ariaControls} aria-haspopup="true" sx={{ color, padding: '3px' }} {...restProps}>
      <AppIcon name={`more_${horizontal ? 'horiz' : 'vert'}`} />
    </IconButton>
  )
}
