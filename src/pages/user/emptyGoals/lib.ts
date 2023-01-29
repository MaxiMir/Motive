import { useIntl } from 'react-intl'

export const useMessages = (clientPage: boolean) => {
  const { formatMessage } = useIntl()
  const type = clientPage ? 'owner' : 'guest'

  return {
    title: formatMessage({ id: `page.user.empty-goals.${type}` }),
  }
}
