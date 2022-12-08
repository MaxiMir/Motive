import { useIntl } from 'react-intl'
import { UserPageDto } from '@dto'

export const useMessages = (name: keyof UserPageDto) => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: `common.${name}` }),
  }
}
