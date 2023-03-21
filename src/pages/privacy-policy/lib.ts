import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: 'page.privacy-policy.header' }),
    content: formatMessage(
      {
        id: 'page.privacy-policy.content',
        defaultMessage: '',
      },
      { name: process.env.NEXT_PUBLIC_APP_NAME, email: process.env.NEXT_PUBLIC_APP_EMAIL },
    ),
  }
}
