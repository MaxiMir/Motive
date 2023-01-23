import { Button } from '@mui/material'
import { MessageDto, MessageType } from '@modules/topic'
import useClient from '@hooks/useClient'
import useFormatNumber from '@hooks/useFormatNumber'
import Emoji from '@ui/Emoji'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { checkOnDisabled } from './helper'
import { useMessages } from './hooks/useMessages'
import { useSetLike } from './hooks/useSetLike'

interface LikeProps {
  message: MessageDto
  answerFor?: number
}

function Like({ message, answerFor }: LikeProps) {
  const { likeCount, type } = message
  const client = useClient()
  const disabled = checkOnDisabled(message, client)
  const messages = useMessages(message, disabled)
  const formatNumber = useFormatNumber()
  const formattedNumber = formatNumber(likeCount)
  const icon = type === MessageType.Question ? 'like' : 'support'
  const [isLoading, onClick] = useSetLike(message, answerFor)

  return (
    <TooltipArrow title={messages.title}>
      <Button
        size="small"
        disabled={disabled || isLoading}
        startIcon={<Emoji name={icon} onlyEmoji />}
        color="inherit"
        sx={({ palette }) => ({
          paddingX: 1,
          color: palette.grey[400],
          minWidth: 'initial',
          filter: !message.like ? 'grayscale(1)' : undefined,
        })}
        onClick={onClick}
      >
        {formattedNumber}
      </Button>
    </TooltipArrow>
  )
}

export default Like
