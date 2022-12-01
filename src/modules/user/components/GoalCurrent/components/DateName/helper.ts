export const getName = (daysGone: number): string | undefined => {
  switch (daysGone) {
    case 1:
      return 'yesterday'
    case 0:
      return 'today'
    case -1:
      return 'tomorrow'
    default:
      return undefined
  }
}
