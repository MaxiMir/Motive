import dynamic from 'next/dynamic'
import { createStyles, makeStyles } from '@material-ui/core'
import { MessageDto } from 'dto'
import { numberToShort } from 'helpers/prepare'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import { useUserPage } from 'views/UserView/hook'
import { checkOnText, getTitle } from './helper'

const LikeText = dynamic(() => import('./components/LikeText'))
const LikeButton = dynamic(() => import('./components/LikeButton'))

interface LikeProps {
  goalId: number
  dayId: number
  message: MessageDto
  answerFor?: number
  icon: 'like' | 'support'
}

export default function Like({ goalId, dayId, message, answerFor, icon }: LikeProps): JSX.Element {
  const classes = useStyles()
  const { data } = useUserPage()
  const text = checkOnText(message, data?.client)
  const title = getTitle(icon, message.like)
  const shortNumber = numberToShort(message.likeCount)

  return (
    <AppBox alignItems="center">
      {text ? (
        <LikeText message={message} title={title} icon={icon} />
      ) : (
        <LikeButton
          goalId={goalId}
          dayId={dayId}
          message={message}
          title={title}
          answerFor={answerFor}
          icon={icon}
          isAuthorized={!!data?.client}
        />
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
