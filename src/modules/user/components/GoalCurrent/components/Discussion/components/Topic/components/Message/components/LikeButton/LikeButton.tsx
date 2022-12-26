import { Button } from '@mui/material'
import { MessageDto, MessageType } from '@features/topic'
import useClient from '@hooks/useClient'
import useFormatNumber from '@hooks/useFormatNumber'
import AppEmoji from '@ui/AppEmoji'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { checkOnDisabled } from './helper'
import { useMessages } from './hooks/useMessages'
import { useSetLike } from './hooks/useSetLike'

interface LikeButtonProps {
  message: MessageDto
  answerFor?: number
}

function LikeButton({ message, answerFor }: LikeButtonProps) {
  const { likeCount, type } = message
  const client = useClient()
  const disabled = checkOnDisabled(message, client)
  const messages = useMessages(message, disabled)
  const formatNumber = useFormatNumber()
  const formattedNumber = formatNumber(likeCount)
  const icon = type === MessageType.Question ? 'like' : 'support'

  const onClick = useSetLike(message, answerFor)

  return (
    <TooltipArrow title={messages.title}>
      <Button
        size="small"
        aria-label={messages.ariaLabel}
        disabled={disabled}
        startIcon={<AppEmoji name={icon} onlyEmoji />}
        sx={{
          color: 'zen.silent',
          width: '40px',
          minWidth: 'initial',
          filter: !message.like ? 'grayscale(1)' : undefined,
        }}
        onClick={onClick}
      >
        {formattedNumber}
      </Button>
    </TooltipArrow>
  )
}

export default LikeButton
