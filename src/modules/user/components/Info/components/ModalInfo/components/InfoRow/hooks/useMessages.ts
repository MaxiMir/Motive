import { useIntl } from 'react-intl'
import { UserDetailDto } from '@dto'

const useMessages = (name: keyof UserDetailDto) => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: `common.${name}` }),
  }
}

export default useMessages
