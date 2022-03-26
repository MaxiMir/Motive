import { createStyles, makeStyles } from '@material-ui/core'
import { MessageDto } from 'dto'
import { numberToShort } from 'helpers/prepare'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import LikeButton from './components/LikeButton'

interface LikeProps {
  message: MessageDto
  answerFor?: number
}

export default function Like({ message, answerFor }: LikeProps): JSX.Element {
  const classes = useStyles()
  const shortNumber = numberToShort(message.likeCount)

  return (
    <AppBox alignItems="center">
      <LikeButton message={message} answerFor={answerFor} />
      <AppTypography className={classes.count}>{shortNumber}</AppTypography>
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    count: {
      fontSize: '0.875rem',
      color: theme.text.silent,
    },
  }),
)
