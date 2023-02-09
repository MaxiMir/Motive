import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: 'page.user.goal-current.discussion-header' }),
  }
}
