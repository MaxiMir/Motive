import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import AppIcon from './AppIcon'

interface AppMenuItemProps {
  icon: string
  text: string
  onClick: () => void
}

export default function AppMenuItem({ icon, text, onClick }: AppMenuItemProps): JSX.Element {
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>
        <AppIcon name={icon} />
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  )
}
