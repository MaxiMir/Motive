import { useIntl } from 'react-intl'
import { MessageDto, MessageType } from '@features/topic'

export const useMessages = (message: MessageDto, disabled: boolean) => {
  const { like, likeCount, type } = message
  const { formatMessage } = useIntl()
  const title = getTitle()
  const ariaLabel = getAreaLabel()

  function getTitle() {
    if (disabled) {
      return !like ? false : formatMessage({ id: 'common.helpful' })
    }

    if (type === MessageType.Question) {
      return formatMessage({ id: !like ? 'common.like' : 'common.unlike' })
    }

    return formatMessage({ id: !like ? 'common.mark-helpful' : 'common.unmark-helpful' })
  }

  function getAreaLabel() {
    if (!title) {
      return undefined
    }

    if (like || !likeCount) {
      return title
    }

    const areaMessageTmpl = formatMessage({ id: 'page.user.like-button.area' })
    const area = areaMessageTmpl.replace('$0', likeCount.toString())

    return `${title} ${area}`
  }

  return {
    title,
    ariaLabel,
  }
}
