import { useIntl } from 'react-intl'

export const useMessages = (clientPage: boolean) => {
  const type = clientPage ? 'owner' : 'guest'
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: `page.user.empty-goals.${type}` }),
  }
}
