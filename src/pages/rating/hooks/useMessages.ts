import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: 'page.rating.header' }),
    ariaLabel: formatMessage({ id: 'page.rating.aria-label' }),
  }
}
