export const getFontSize = (size: number): number => {
  switch (size) {
    case 120:
    case 80:
      return 40
    case 55:
      return 35
    case 35:
    case 32:
      return 25
    default:
      return 15
  }
}
