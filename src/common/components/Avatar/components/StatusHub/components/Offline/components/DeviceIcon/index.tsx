import { Device } from 'src/common/helpers/dom'
import AppIcon from 'src/common/ui/AppIcon'
import { getIconName } from './helper'

interface DeviceIconProps {
  device: Device
}

export default function DeviceIcon({ device }: DeviceIconProps): JSX.Element {
  const iconName = getIconName(device)

  return <AppIcon name={iconName} sx={{ fontSize: '0.75rem!important' }} />
}
