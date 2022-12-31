import { useIntl } from 'react-intl'

export const useMessages = (report: boolean) => {
  const { formatMessage } = useIntl()

  return {
    shareText: formatMessage({ id: 'common.share' }),
    reportText: !report ? '' : formatMessage({ id: 'common.report' }),
    cancelText: formatMessage({ id: 'common.cancel' }),
  }
}
