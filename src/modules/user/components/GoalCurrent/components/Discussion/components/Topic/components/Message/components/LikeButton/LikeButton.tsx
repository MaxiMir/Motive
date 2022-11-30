import { useIntl } from 'react-intl'
import { Button, Tooltip } from '@mui/material'
import { MessageDto, MessageType } from '@dto'
import useClient from '@hooks/useClient'
import AppEmoji from '@ui/AppEmoji'
import { checkOnDisabled } from './helper'
import useSetLike from './hooks/useSetLike'

interface LikeButtonProps {
  message: MessageDto
  answerFor?: number
}

function LikeButton({ message, answerFor }: LikeButtonProps) {
  const { like, likeCount, type } = message
  const { formatMessage } = useIntl()
  const client = useClient()
  const disabled = checkOnDisabled(message, client)
  const isQuestion = type === MessageType.Question
  const title = getTitle()
  const ariaLabel = getAreaLabel()
  const icon = isQuestion ? 'like' : 'support'

  const onClick = useSetLike(message, answerFor)

  function getTitle() {
    if (disabled) {
      return !like ? false : formatMessage({ id: 'common.helpful' })
    }

    if (isQuestion) {
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

  return (
    <Tooltip title={title} arrow followCursor>
      <span>
        <Button
          size="small"
          aria-label={ariaLabel}
          disabled={disabled}
          sx={{
            width: 24,
            height: 24,
            minWidth: 'initial',
            filter: !message.like ? 'grayscale(1)' : undefined,
          }}
          onClick={onClick}
        >
          <AppEmoji name={icon} onlyEmoji />
        </Button>
      </span>
    </Tooltip>
  )
}

export default LikeButton
