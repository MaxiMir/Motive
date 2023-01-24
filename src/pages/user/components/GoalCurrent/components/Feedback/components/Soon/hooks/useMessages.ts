import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    soonText: formatMessage({ id: 'common.soon' }),
  }
}
