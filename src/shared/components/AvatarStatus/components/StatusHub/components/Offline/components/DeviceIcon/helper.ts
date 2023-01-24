import { Device } from '@entities/device'

export const getIconName = (device: Device): string => {
  switch (device) {
    case 'mobile':
      return 'phone_iphone'
    case 'tablet':
      return 'tablet'
    default:
      return 'computer'
  }
}
