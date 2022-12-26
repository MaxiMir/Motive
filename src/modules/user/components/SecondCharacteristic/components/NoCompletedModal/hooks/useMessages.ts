import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.completed' }),
    subtitle: formatMessage({ id: 'common.goals' }),
  }
}
