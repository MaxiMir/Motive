export function getRateMessageId(value: number) {
  if (value >= 8) {
    return 'common.sphere-high'
  }

  if (value >= 5) {
    return 'common.sphere-middle'
  }

  return !value ? null : 'common.sphere-low'
}

export function parseScales(scales: string) {
  return scales.split(';').map((scale, index) => ({ scale, number: index + 1 }))
}
