import { Device } from '@helpers/window'
import AppIcon from '@ui/AppIcon'
import { getIconName } from './helper'

interface DeviceIconProps {
  device: Device
}

function DeviceIcon({ device }: DeviceIconProps): JSX.Element {
  const iconName = getIconName(device)

  return <AppIcon name={iconName} sx={{ fontSize: '0.75rem!important' }} />
}

export default DeviceIcon
