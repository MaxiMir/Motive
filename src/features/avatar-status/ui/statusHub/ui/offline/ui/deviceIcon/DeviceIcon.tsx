import { Device } from '@entities/device'
import Icon from '@shared/ui/Icon'
import { getIconName } from './lib/helpers/content'

interface DeviceIconProps {
  device: Device
}

function DeviceIcon({ device }: DeviceIconProps): JSX.Element {
  const iconName = getIconName(device)

  return <Icon name={iconName} />
}

export default DeviceIcon
