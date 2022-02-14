import clsx from 'clsx'
import { Button, makeStyles } from '@material-ui/core'
import { MessageDto } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'
import AppTooltip from 'components/UI/AppTooltip'
import useSetLike from './hook'

interface LikeButtonProps {
  goalId: number
  dayId: number
  message: MessageDto
  title: string
  answerFor?: number
  icon: 'like' | 'support'
  isAuthorized: boolean
}

export default function LikeButton({
  goalId,
  dayId,
  message,
  title,
  answerFor,
  icon,
  isAuthorized,
}: LikeButtonProps): JSX.Element {
  const { like, likeCount } = message
  const classes = useStyles()
  const onClick = useSetLike(goalId, dayId, message, answerFor, isAuthorized)

  return (
    <AppTooltip title={title}>
      <Button
        size="small"
        aria-label={`${title} ${!likeCount ? '' : ` along with ${likeCount} other people`}`}
        className={clsx([classes.button, !like && classes.buttonNotActive])}
        onClick={onClick}
      >
        <AppEmoji name={icon} onlyEmoji />
      </Button>
    </AppTooltip>
  )
}

const useStyles = makeStyles({
  button: {
    width: 24,
    height: 24,
    minWidth: 'initial',
  },
  buttonNotActive: {
    filter: 'grayscale(1)',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      filter: 'initial',
    },
  },
})
