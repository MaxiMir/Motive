import { useIntl } from 'react-intl'
import { UserBaseDto } from '@modules/user'

export const useMessages = (owner: UserBaseDto) => {
  const { formatMessage } = useIntl()
  const supportingText = formatMessage({ id: 'common.supporting' })

  return {
    title: `${supportingText} ${owner.name}`,
  }
}
