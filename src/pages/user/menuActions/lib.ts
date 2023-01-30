import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.more' }),
    shareText: formatMessage({ id: 'common.share' }),
    reportText: formatMessage({ id: 'common.report' }),
    cancelText: formatMessage({ id: 'common.cancel' }),
  }
}
