import { ListItemIcon, ListItemText } from '@mui/material'
import Icon from './Icon'

interface ListItemProps {
  icon: string
  primary: string
  color?: string
  compact?: boolean
}

function ListItem({ icon, primary, color = 'primary.dark', compact = true }: ListItemProps) {
  const fontSize = compact ? 18 : 24

  return (
    <>
      <ListItemIcon>
        <Icon name={icon} color={color} fontSize={fontSize} />
      </ListItemIcon>
      <ListItemText primary={primary} />
    </>
  )
}

export default ListItem
