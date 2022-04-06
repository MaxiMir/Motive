import { IconButton, useTheme, IconButtonProps } from '@mui/material'
import AppIcon from './AppIcon'

type AppIconButtonProps = Omit<IconButtonProps, 'disableFocusRipple' | 'children'> & {
  name: string
}

export default function AppIconButton({ name, className, ...props }: AppIconButtonProps): JSX.Element {
  const theme = useTheme()

  return (
    <IconButton disableFocusRipple sx={{ color: theme.text.silent }} {...props}>
      <AppIcon name={name} />
    </IconButton>
  )
}
