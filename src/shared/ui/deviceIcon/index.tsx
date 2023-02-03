import { Device } from 'shared/api'
import Icon from 'shared/ui/Icon'
import { getIconName } from './lib'

interface DeviceIconProps {
  device: Device
}

function DeviceIcon({ device }: DeviceIconProps) {
  const iconName = getIconName(device)

  return <Icon name={iconName} />
}

export default DeviceIcon
