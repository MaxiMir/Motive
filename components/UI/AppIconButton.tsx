import { IconButton, IconButtonProps } from '@mui/material'
import AppIcon from './AppIcon'

type AppIconButtonProps = Omit<IconButtonProps, 'disableFocusRipple' | 'children'> & {
  name: string
}

export default function AppIconButton({ name, className, ...props }: AppIconButtonProps): JSX.Element {
  return (
    <IconButton disableFocusRipple sx={{ color: 'zen.silent' }} {...props}>
      <AppIcon name={name} />
    </IconButton>
  )
}
