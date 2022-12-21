import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    learnMoreText: formatMessage({ id: 'common.info' }),
  }
}
