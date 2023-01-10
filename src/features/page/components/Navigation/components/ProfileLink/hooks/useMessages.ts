import { useIntl } from 'react-intl'
import { ClientDto } from '@features/user'

export const useMessages = (client?: ClientDto) => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: client ? 'common.my-page' : 'common.sign-in' }),
  }
}
