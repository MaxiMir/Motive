import { useIntl } from 'react-intl'
import { ClientDto } from 'shared/api'

export const useMessages = (client?: ClientDto) => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: client ? 'common.my-page' : 'common.sign-in' }),
  }
}
