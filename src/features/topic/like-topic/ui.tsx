import { Button } from '@mui/material'
import { useClient } from 'entities/user'
import { MessageDto, TopicType } from 'shared/api'
import { useFormatNumber } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { checkOnDisabled, useMessages } from './lib'
import { useSetLike } from './model'

interface LikeProps {
  message: MessageDto
  answerFor?: number
}

export function Like({ message, answerFor }: LikeProps) {
  const { likeCount, type } = message
  const client = useClient()
  const disabled = checkOnDisabled(message, client)
  const messages = useMessages(message, disabled)
  const formatNumber = useFormatNumber()
  const formattedNumber = formatNumber(likeCount)
  const startIcon = type === TopicType.Question ? '❤️' : '🙏'
  const [isLoading, onClick] = useSetLike(message, answerFor)

  return (
    <TooltipArrow title={messages.title}>
      <Button
        size="small"
        disabled={disabled || isLoading}
        startIcon={startIcon}
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
