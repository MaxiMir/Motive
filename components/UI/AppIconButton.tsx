import { IconButton, IconButtonProps } from '@mui/material'
import AppIcon from './AppIcon'

type AppIconButtonProps = Omit<IconButtonProps, 'disableFocusRipple' | 'children'> & {
  name: string
}

export default function AppIconButton({ name, ...props }: AppIconButtonProps): JSX.Element {
  return (
    <IconButton disableFocusRipple {...props}>
      <AppIcon name={name} />
    </IconButton>
  )
}
