import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    buttonTitle: formatMessage({ id: 'page.user.goal-current.open-menu' }),
    shareText: formatMessage({ id: 'common.share' }),
    reportText: formatMessage({ id: 'common.report' }),
    leaveText: formatMessage({ id: 'common.leave' }),
    cancelText: formatMessage({ id: 'common.cancel' }),
  }
}
