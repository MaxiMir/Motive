import { Button } from '@mui/material'
import { useClient } from 'entities/user'
import { MessageDto, TopicType } from 'shared/api'
import { useFormatNumber } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { checkOnDisabled, useMessages } from './lib'
import { useSetLike } from './model'

interface LikeProps {
  message: MessageDto
  parentId?: number
}

export function Like({ message, parentId }: LikeProps) {
  const { likeCount, type } = message
  const client = useClient()
  const disabled = checkOnDisabled(message, client)
  const messages = useMessages(message, disabled)
  const formatNumber = useFormatNumber()
  const formattedNumber = formatNumber(likeCount)
  const startIcon = type === TopicType.Question ? '❤️' : '🙏'
  const [isLoading, onClick] = useSetLike(message, parentId)

  return (
    <TooltipArrow title={messages.title}>
      <Button
        size="small"
        disabled={disabled || isLoading}
        startIcon={startIcon}
        sx={(theme) => ({
          paddingX: 1,
          color: theme.palette.grey[400],
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
