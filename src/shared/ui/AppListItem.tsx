import { ListItemIcon, ListItemText } from '@mui/material'
import AppIcon from './AppIcon'

interface AppListItemProps {
  icon: string
  primary: string
  color?: string
  compact?: boolean
}

function AppListItem({ icon, primary, color = 'primary.dark', compact = true }: AppListItemProps) {
  return (
    <>
      <ListItemIcon
        sx={{
          '& span': {
            color,
            fontSize: compact ? 18 : 24,
          },
        }}
      >
        <AppIcon name={icon} />
      </ListItemIcon>
      <ListItemText primary={primary} />
    </>
  )
}

export default AppListItem
