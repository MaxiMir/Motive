import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    shareText: formatMessage({ id: 'common.share' }),
    reportText: formatMessage({ id: 'common.report' }),
    leaveText: formatMessage({ id: 'common.leave' }),
  }
}
