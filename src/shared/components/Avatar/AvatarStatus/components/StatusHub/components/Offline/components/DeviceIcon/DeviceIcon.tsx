import { Device } from '@helpers/navigator'
import AppIcon from '@ui/AppIcon'
import { getIconName } from './helper'

interface DeviceIconProps {
  device: Device
}

function DeviceIcon({ device }: DeviceIconProps): JSX.Element {
  const iconName = getIconName(device)

  return <AppIcon name={iconName} />
}

export default DeviceIcon
