import { Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { useIntl } from 'react-intl'
import { useViewer } from 'entities/viewer'
import { MessageDto } from 'shared/api'
import { useFormatNumber } from 'shared/lib/hooks'
import Icon from 'shared/ui/icon'
import TooltipArrow from 'shared/ui/tooltip-arrow'
import { useSetLike } from './model'

interface TopicLikeProps {
  message: MessageDto
  parentId?: number
}

export function TopicLike({ message, parentId }: TopicLikeProps) {
  const viewer = useViewer()
  const { formatMessage } = useIntl()
  const disabled = message.user.id === viewer?.id
  const title = formatMessage({ id: disabled ? 'common.like-yourself' : 'common.like' })
  const formatNumber = useFormatNumber()
  const formattedNumber = formatNumber(message.likeCount)
  const [isLoading, onClick] = useSetLike(message, parentId)

  return (
    <TooltipArrow title={title}>
      <Button
        size="small"
        disabled={disabled || isLoading}
        startIcon={
          <Icon
            name="favorite"
            sx={(theme) => ({
              color: message.like ? red[800] : theme.palette.grey[400],
            })}
          />
        }
        sx={(theme) => ({
          minWidth: 'initial',
          paddingX: 1,
          color: message.like ? red[400] : theme.palette.grey[400],
        })}
        onClick={onClick}
      >
        {formattedNumber}
      </Button>
    </TooltipArrow>
  )
}
