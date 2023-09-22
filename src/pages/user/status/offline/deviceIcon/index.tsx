import Icon from 'shared/ui/Icon'
import { getIconName } from './lib'

interface DeviceIconProps {
  device: string
}

function DeviceIcon({ device }: DeviceIconProps) {
  const iconName = getIconName(device)

  return <Icon name={iconName} fontSize={12} />
}

export default DeviceIcon
