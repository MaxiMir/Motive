import { Button, makeStyles } from '@material-ui/core'
import { numberToShort, toUpperFirstChar } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

interface ReactionProps {
  type: 'like' | 'dislike'
  count: number
}

export default function Reaction({ type, count }: ReactionProps): JSX.Element {
  const classes = useStyles()
  const typeFormatted = toUpperFirstChar(type)

  return (
    <AppBox alignItems="center" spacing={0.5}>
      <Button
        size="small"
        aria-label={`${typeFormatted} this message${!count ? '' : ` along with ${count} other people`}`}
        title={typeFormatted}
        className={classes.button}
      >
        <AppEmoji name={type} onlyEmoji />
      </Button>
      <AppTypography className={classes.count}>{numberToShort(count)}</AppTypography>
    </AppBox>
  )
}

const useStyles = makeStyles({
  button: {
    width: 24,
    height: 24,
    minWidth: 'initial',
  },
  count: {
    fontSize: 14,
    minWidth: 34,
    color: '#99989D',
  },
})
