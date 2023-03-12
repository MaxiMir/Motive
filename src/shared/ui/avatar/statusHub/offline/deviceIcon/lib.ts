import { Device } from 'shared/api'

export const getIconName = (device: Device): string => {
  switch (device) {
    case 'feature phone':
    case 'smartphone':
    case 'phablet':
      return 'phone_iphone'
    case 'tablet':
      return 'tablet'
    default:
      return 'computer'
  }
}
