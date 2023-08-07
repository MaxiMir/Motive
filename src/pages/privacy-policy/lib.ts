import { useIntl } from 'react-intl'

export function useMessages() {
  const { formatMessage } = useIntl()

  return {
    header: formatMessage({ id: 'common.privacy-policy' }),
    content: formatMessage(
      {
        id: 'page.privacy-policy.content',
        defaultMessage: '',
      },
      { name: process.env.NEXT_PUBLIC_APP_NAME, email: process.env.NEXT_PUBLIC_APP_EMAIL },
    ),
  }
}
