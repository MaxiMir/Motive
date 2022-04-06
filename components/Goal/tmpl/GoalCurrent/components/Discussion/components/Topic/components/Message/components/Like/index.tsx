import { Theme, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { MessageDto } from 'dto'
import { numberToShort } from 'helpers/prepare'
import AppBox from 'components/UI/AppBox'
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
      <Typography className={classes.count}>{shortNumber}</Typography>
    </AppBox>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    count: {
      fontSize: '0.875rem',
      color: theme.text.silent,
    },
  }),
)
