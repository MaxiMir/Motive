import { useIntl } from 'react-intl'

const useFormatNumber = () => {
  const { locale } = useIntl()

  return (value: number) => {
    const formatter = Intl.NumberFormat(locale, { notation: 'compact' })

    return formatter.format(value)
  }
}

export default useFormatNumber