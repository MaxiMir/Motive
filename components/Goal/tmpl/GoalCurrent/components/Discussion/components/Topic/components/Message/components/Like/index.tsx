import dynamic from 'next/dynamic'
import { createStyles, makeStyles } from '@material-ui/core'
import { MessageDto, MessageType } from 'dto'
import { numberToShort } from 'helpers/prepare'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import { useUserPage } from 'views/UserView/hook'
import { checkOnText } from './helper'

const LikeText = dynamic(() => import('./components/LikeText'))
const LikeButton = dynamic(() => import('./components/LikeButton'))

interface LikeProps {
  message: MessageDto
  answerFor?: number
}

export default function Like({ message, answerFor }: LikeProps): JSX.Element {
  const classes = useStyles()
  const { data } = useUserPage()
  const text = checkOnText(message, data?.client)
  const shortNumber = numberToShort(message.likeCount)
  const icon = message.type === MessageType.QUESTION ? 'like' : 'support'

  return (
    <AppBox alignItems="center">
      {text ? (
        <LikeText message={message} icon={icon} />
      ) : (
        <LikeButton message={message} icon={icon} answerFor={answerFor} isAuthorized={!!data?.client} />
      )}
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
