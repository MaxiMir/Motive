import { useIntl } from 'react-intl'
import { UserBaseDto } from 'shared/api'

export const useMessages = (owner: UserBaseDto) => {
  const { formatMessage } = useIntl()
  const supportingText = formatMessage({ id: 'common.supporting' })

  return {
    title: `${supportingText} ${owner.name}`,
  }
}
