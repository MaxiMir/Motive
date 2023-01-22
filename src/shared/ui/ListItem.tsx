import { ListItemIcon, ListItemText } from '@mui/material'
import Icon from './Icon'

interface ListItemProps {
  icon: string
  primary: string
  color?: string
  compact?: boolean
}

function ListItem({ icon, primary, color = 'primary.dark', compact = true }: ListItemProps) {
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
        <Icon name={icon} />
      </ListItemIcon>
      <ListItemText primary={primary} />
    </>
  )
}

export default ListItem
