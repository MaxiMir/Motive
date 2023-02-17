import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    nothingText: formatMessage({ id: 'common.nothing' }),
  }
}
