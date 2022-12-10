import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    withText: formatMessage({ id: 'common.with' }),
  }
}
