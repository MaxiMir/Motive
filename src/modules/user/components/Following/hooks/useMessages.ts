import { useIntl } from 'react-intl'

export const useMessages = (following: boolean) => {
  const { formatMessage } = useIntl()
  const operation = following ? 'remove' : 'add'

  return {
    buttonText: formatMessage({ id: `page.user.following.${operation}` }),
  }
}
