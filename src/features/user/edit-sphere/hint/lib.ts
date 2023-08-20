import { useIntl } from 'react-intl'

export function useAlertSetup(value: number) {
  const { formatMessage } = useIntl()

  if (value >= 8) {
    return {
      color: 'success' as const,
      icon: 'done',
      text: formatMessage({ id: 'common.sphere-high' }),
    }
  }

  if (value >= 5) {
    return {
      color: 'warning' as const,
      icon: 'error',
      text: formatMessage({ id: 'common.sphere-middle' }),
    }
  }

  return {
    color: 'error' as const,
    icon: 'crisis_alert',
    text: formatMessage({ id: 'common.sphere-low' }),
  }
}
