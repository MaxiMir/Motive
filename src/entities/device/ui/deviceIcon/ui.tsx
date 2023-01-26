import { Device } from '@shared/api/dto'
import Icon from '@shared/ui/Icon'
import { getIconName } from './lib'

interface DeviceIconProps {
  device: Device
}

export function DeviceIcon({ device }: DeviceIconProps): JSX.Element {
  const iconName = getIconName(device)

  return <Icon name={iconName} />
}
