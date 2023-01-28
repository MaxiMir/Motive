import { useIntl } from 'react-intl'

export const useMessages = (header?: string) => {
  const { formatMessage } = useIntl()

  return {
    header: header || formatMessage({ id: 'common.error' }),
    backText: formatMessage({ id: 'common.back' }),
  }
}
