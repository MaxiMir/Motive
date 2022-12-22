import { useIntl } from 'react-intl'
import { UserPageDto } from '@features/page'

export const useMessages = (name: keyof UserPageDto) => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: `common.${name}` }),
  }
}