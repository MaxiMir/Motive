import { useIntl } from 'react-intl'

export const useTitle = (statusCode: '404' | '500') => {
  const { formatMessage } = useIntl()

  return formatMessage({ id: `page.${statusCode}.title` })
}
