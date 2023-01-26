import { useIntl } from 'react-intl'

export const useMessages = (statusCode: number) => {
  const { formatMessage } = useIntl()
  const id = [404, 500].includes(statusCode) ? `page.${statusCode}.title` : 'common.error'

  return {
    header: formatMessage({ id }),
    backText: formatMessage({ id: 'common.back' }),
  }
}
