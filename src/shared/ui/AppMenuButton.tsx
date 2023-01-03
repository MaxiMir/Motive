import { IconButton, IconButtonProps, TypographyProps } from '@mui/material'
import TooltipArrow from '@ui/styled/TooltipArrow'
import AppIcon from './AppIcon'

interface AppMenuButtonProps extends Omit<IconButtonProps, 'color' | 'sx'> {
  color?: TypographyProps['color']
}

function AppMenuButton({ title, color = 'secondary.main', ...restProps }: AppMenuButtonProps) {
  return (
    <TooltipArrow title={title}>
      <IconButton sx={{ color, padding: '3px' }} {...restProps}>
        <AppIcon name="more_horiz" />
      </IconButton>
    </TooltipArrow>
  )
}

export default AppMenuButton
