import clsx from 'clsx'
import { Button, createStyles, makeStyles } from '@material-ui/core'
import { numberToShort } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppTooltip from 'components/UI/AppTooltip'
import useSetReaction from './hook'

interface ReactionProps {
  messageId: number
  likes: number[]
  type: 'like' | 'support'
}

export default function Reaction({ messageId, likes, type }: ReactionProps): JSX.Element {
  const classes = useStyles()
  const [active, count, onClick] = useSetReaction(messageId, likes)
  const title = type === 'like' ? 'Like the question' : 'Mark as very helpful'

  return (
    <AppBox alignItems="center">
      <AppTooltip title={title}>
        <Button
          size="small"
          aria-label={`${title} ${!count ? '' : ` along with ${count} other people`}`}
          className={clsx([classes.button, !active && classes.buttonNotActive])}
          onClick={onClick}
        >
          <AppEmoji name={type} onlyEmoji />
        </Button>
      </AppTooltip>
      <AppTypography className={classes.count}>{numberToShort(count)}</AppTypography>
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
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
    count: {
      fontSize: '0.875rem',
      color: theme.text.silent,
    },
  }),
)
