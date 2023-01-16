import { useIntl } from 'react-intl'

export const useMessages = (statusCode: number) => {
  const { formatMessage } = useIntl()
  const id = statusCode === 404 ? 'page.404.title' : 'common.error'

  return {
    header: formatMessage({ id }),
    backText: formatMessage({ id: 'common.back' }),
  }
}
