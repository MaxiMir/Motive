import { useIntl } from 'react-intl'

export const useMessages = (name: string) => {
  const { formatMessage } = useIntl()

  return {
    tabText: formatMessage({ id: `common.${name}` }),
  }
}
