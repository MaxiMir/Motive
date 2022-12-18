import { useIntl } from 'react-intl'

export const useMessages = (name: string) => {
  const { formatMessage } = useIntl()
  const support = formatMessage({ id: 'common.support' })

  return {
    title: `${support} ${name}`,
  }
}
