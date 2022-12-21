import { useIntl } from 'react-intl'

export const useMessages = (type: string) => {
  const { formatMessage } = useIntl()

  return {
    placeholder: formatMessage({ id: `page.user.user-input.${type}` }),
  }
}
