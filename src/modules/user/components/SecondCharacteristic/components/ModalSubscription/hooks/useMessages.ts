import { useIntl } from 'react-intl'

export const useMessages = (name: string) => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: `common.${name}` }),
  }
}
