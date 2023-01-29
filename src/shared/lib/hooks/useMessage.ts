import { useIntl } from 'react-intl'

export const useMessage = (id: string) => {
  const { formatMessage } = useIntl()

  return formatMessage({ id })
}
