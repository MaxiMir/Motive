import { Button, makeStyles } from '@material-ui/core'
import { MessageDto, MessageType } from 'dto'
import useClient from 'hooks/useClient'
import AppEmoji from 'components/UI/AppEmoji'
import AppOptionalTooltip from 'components/UI/AppOptionalTooltip'
import { checkOnDisabled, getAreaLabel, getTitle } from './helper'
import useSetLike from './hook'

interface LikeButtonProps {
  message: MessageDto
  answerFor?: number
}

export default function LikeButton({ message, answerFor }: LikeButtonProps): JSX.Element {
  const classes = useStyles()
  const client = useClient()
  const disabled = checkOnDisabled(message, client)
  const title = getTitle(message, disabled)
  const ariaLabel = getAreaLabel(message, title)
  const onClick = useSetLike(message, answerFor)
  const icon = message.type === MessageType.QUESTION ? 'like' : 'support'

  return (
    <AppOptionalTooltip title={title}>
      <Button size="small" aria-label={ariaLabel} disabled={disabled} className={classes.button} onClick={onClick}>
        <AppEmoji name={icon} onlyEmoji />
      </Button>
    </AppOptionalTooltip>
  )
}

const useStyles = makeStyles({
  button: {
    width: 24,
    height: 24,
    minWidth: 'initial',
  },
})
