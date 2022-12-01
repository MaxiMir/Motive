import { IconButton, IconButtonProps } from '@mui/material'
import AppIcon from './AppIcon'

interface AppIconButtonProps extends Omit<IconButtonProps, 'disableFocusRipple' | 'children'> {
  name: string
}

function AppIconButton({ name, ...props }: AppIconButtonProps) {
  return (
    <IconButton disableFocusRipple {...props}>
      <AppIcon name={name} />
    </IconButton>
  )
}

export default AppIconButton
