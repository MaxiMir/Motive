import { IconButton, IconButtonProps, TypographyProps } from '@mui/material'
import TooltipArrow from '@ui/styled/TooltipArrow'
import AppIcon from './AppIcon'

interface AppMenuButtonProps extends Pick<IconButtonProps, 'title' | 'onClick'> {
  color?: TypographyProps['color']
  horizontal?: boolean
}

function AppMenuButton({
  title,
  color = 'secondary.main',
  horizontal,
  ...restProps
}: AppMenuButtonProps) {
  return (
    <TooltipArrow title={title}>
      <IconButton
        aria-label={title}
        aria-haspopup="true"
        sx={{ color, padding: '3px' }}
        {...restProps}
      >
        <AppIcon name={`more_${horizontal ? 'horiz' : 'vert'}`} />
      </IconButton>
    </TooltipArrow>
  )
}

export default AppMenuButton
