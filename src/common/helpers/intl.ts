export const formatNumber = (value: number): string => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })

  return formatter.format(value)
}

export const dateFormatter = (value: string, locale: string): string => {
  const date = new Date(value)

  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date)
}
