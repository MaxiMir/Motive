import clsx from 'clsx'
import { Button, createStyles, makeStyles } from '@material-ui/core'
import { numberToShort } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppTooltip from 'components/UI/AppTooltip'
import useSetReaction from './hook'
import { getTitle } from './helper'

interface ReactionProps {
  id: number
  type: 'like' | 'support'
  like?: boolean
  likeCount: number
}

export default function Reaction({ id, like, likeCount, type }: ReactionProps): JSX.Element {
  const classes = useStyles()
  const onClick = useSetReaction(id, false)
  const title = getTitle(type, like)

  return (
    <AppBox alignItems="center">
      <AppTooltip title={title}>
        <Button
          size="small"
          aria-label={`${title} ${!likeCount ? '' : ` along with ${likeCount} other people`}`}
          className={clsx([classes.button, !like && classes.buttonNotActive])}
          onClick={onClick}
        >
          <AppEmoji name={type} onlyEmoji />
        </Button>
      </AppTooltip>
      <AppTypography className={classes.count}>{numberToShort(likeCount)}</AppTypography>
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
