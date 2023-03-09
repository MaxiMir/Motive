import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: 'common.donate' }),
    content: formatMessage({ id: 'page.donate.content' }),
  }
}
