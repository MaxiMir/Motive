import { Box, Theme, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { MessageDto } from 'dto'
import { numberToShort } from 'helpers/prepare'
import LikeButton from './components/LikeButton'

interface LikeProps {
  message: MessageDto
  answerFor?: number
}

export default function Like({ message, answerFor }: LikeProps): JSX.Element {
  const classes = useStyles()
  const shortNumber = numberToShort(message.likeCount)

  return (
    <Box display="flex" alignItems="center">
      <LikeButton message={message} answerFor={answerFor} />
      <Typography className={classes.count}>{shortNumber}</Typography>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    count: {
      fontSize: '0.875rem',
      color: theme.palette.zen.silent,
    },
  }),
)
