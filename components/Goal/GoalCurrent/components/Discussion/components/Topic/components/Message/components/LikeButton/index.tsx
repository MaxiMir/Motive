import { Button } from '@mui/material'
import { MessageDto, MessageType } from 'dto'
import useClient from 'hooks/useClient'
import { Locale } from 'hooks/useLocale'
import OptionalTooltip from 'components/OptionalTooltip'
import AppEmoji from 'components/ui/AppEmoji'
import { checkOnDisabled, getAreaLabel, getTitle } from './helper'
import useSetLike from './hook'

interface LikeButtonProps {
  message: MessageDto
  answerFor?: number
  locale: Locale
}

export default function LikeButton({ message, answerFor, locale }: LikeButtonProps) {
  const client = useClient()
  const disabled = checkOnDisabled(message, client)
  const title = getTitle(message, disabled, locale)
  const ariaLabel = getAreaLabel(message, title, locale)
  const onClick = useSetLike(message, answerFor)
  const icon = message.type === MessageType.Question ? 'like' : 'support'

  return (
    <OptionalTooltip tmpl="custom" custom={title} wrap={!!title}>
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
    </OptionalTooltip>
  )
}
