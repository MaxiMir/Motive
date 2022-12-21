import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'component.report.title' }),
    reports: [
      formatMessage({ id: 'common.nudity' }),
      formatMessage({ id: 'common.violence' }),
      formatMessage({ id: 'common.terrorism' }),
      formatMessage({ id: 'common.spam' }),
      formatMessage({ id: 'common.something-else' }),
    ],
  }
}
