import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    arialLabel: formatMessage({ id: 'common.reactions' }),
  }
}
