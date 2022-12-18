import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    buttonText: formatMessage({ id: 'common.edit' }),
  }
}
