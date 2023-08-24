import { green, orange, red } from '@mui/material/colors'
import Icon from 'shared/ui/Icon'

interface PriorityIconProps {
  priority: string
}

function PriorityIcon({ priority }: PriorityIconProps) {
  const color = getColor()

  function getColor() {
    switch (priority) {
      case 'high':
        return red[500]
      case 'medium':
        return orange[500]
      default:
        return green[500]
    }
  }

  return <Icon name="flag" color={color} fontSize={16} />
}

export default PriorityIcon
