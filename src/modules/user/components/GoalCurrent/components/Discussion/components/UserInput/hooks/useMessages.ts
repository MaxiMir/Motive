import { useIntl } from 'react-intl'

export const useMessages = (type: string) => {
  const { formatMessage } = useIntl()

  return {
    sendText: formatMessage({ id: 'common.send' }),
    placeholder: formatMessage({ id: `page.user.user-input.${type}` }),
  }
}
