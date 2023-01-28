import { useIntl } from 'react-intl'

export const useMessages = (type: string) => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: `common.${type}` }),
  }
}
