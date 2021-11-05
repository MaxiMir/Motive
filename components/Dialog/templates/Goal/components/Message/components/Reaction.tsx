import { IconButton, makeStyles } from '@material-ui/core'
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

  return (
    <AppBox alignItems="center" spacing={0.5}>
      <IconButton
        size="small"
        aria-label={`${toUpperFirstChar(type)} this message${!count ? '' : ` along with ${count} other people`}`}
        className={classes.button}
      >
        <AppEmoji name={type} onlyEmoji />
      </IconButton>
      <AppTypography className={classes.count}>{numberToShort(count)}</AppTypography>
    </AppBox>
  )
}

const useStyles = makeStyles({
  button: {
    width: 24,
    height: 24,
    fontSize: 14,
    padding: '0 0 4px 4px',
  },
  count: {
    fontSize: 14,
    minWidth: 34,
    color: '#99989D',
  },
})
