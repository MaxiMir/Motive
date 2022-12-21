import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    subheader: formatMessage({ id: 'page.home.subheader' }),
  }
}
