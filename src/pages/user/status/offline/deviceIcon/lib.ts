export function getIconName(device: string): string {
  switch (device) {
    case 'mobile':
      return 'phone_iphone'
    case 'tablet':
      return 'tablet'
    default:
      return 'computer'
  }
}
