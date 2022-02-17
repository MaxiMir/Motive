import { ListItemIcon, ListItemText } from '@material-ui/core'
import AppIcon from './AppIcon'

interface AppMenuItemContentProps {
  icon: string
  text: string
}

export default function AppMenuItemContent({ icon, text }: AppMenuItemContentProps): JSX.Element {
  return (
    <>
      <ListItemIcon>
        <AppIcon name={icon} />
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </>
  )
}
