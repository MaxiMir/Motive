import { useIntl } from 'react-intl'
import { MessageDto, TopicType } from 'shared/api'

export const useMessages = (message: MessageDto, disabled: boolean) => {
  const { like, type } = message
  const { formatMessage } = useIntl()
  const title = getTitle()

  function getTitle() {
    if (disabled) {
      return !like ? false : formatMessage({ id: 'common.helpful' })
    }

    if (type === TopicType.Question) {
      return formatMessage({ id: !like ? 'common.like' : 'common.unlike' })
    }

    return formatMessage({ id: !like ? 'common.mark-helpful' : 'common.unmark-helpful' })
  }

  return {
    title,
  }
}
