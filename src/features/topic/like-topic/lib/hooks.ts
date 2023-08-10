import { useIntl } from 'react-intl'
import { MessageDto } from 'shared/api'

export function useTitle(message: MessageDto, disabled: boolean) {
  const { like, type } = message
  const { formatMessage } = useIntl()

  if (disabled) {
    return !like ? false : formatMessage({ id: 'common.helpful' })
  }

  if (type === 'question') {
    return formatMessage({ id: !like ? 'common.like' : 'common.unlike' })
  }

  return formatMessage({ id: !like ? 'common.mark-helpful' : 'common.unmark-helpful' })
}
