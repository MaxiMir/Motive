import { ListItemIcon, ListItemText, MenuItem, MenuItemProps } from '@mui/material'
import AppIcon from './AppIcon'

type AppMenuItemProps = Pick<MenuItemProps, 'onClick'> & {
  icon: string
  color?: string
  disabled?: boolean
  smallIcon?: boolean
  text: string
}

function AppMenuItem({
  icon,
  text,
  color = 'primary.dark',
  disabled,
  smallIcon = true,
  onClick,
}: AppMenuItemProps) {
  return (
    <MenuItem disabled={disabled} onClick={onClick}>
      <ListItemIcon
        sx={{
          '& span': {
            color,
            fontSize: smallIcon ? 18 : 24,
          },
        }}
      >
        <AppIcon name={icon} />
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  )
}

export default AppMenuItem
