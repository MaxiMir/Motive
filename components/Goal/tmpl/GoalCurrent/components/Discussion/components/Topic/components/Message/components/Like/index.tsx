import dynamic from 'next/dynamic'
import { createStyles, makeStyles } from '@material-ui/core'
import { MessageDto } from 'dto'
import { numberToShort } from 'helpers/prepare'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import { useUserPage } from 'views/UserView/hook'
import { checkOnOwner } from './helper'

const LikeText = dynamic(() => import('./components/LikeText'))
const LikeButton = dynamic(() => import('./components/LikeButton'))

interface LikeProps {
  dayID: number
  message: MessageDto
  answerFor?: number
  icon: 'like' | 'support'
}

export default function Like({ dayID, message, answerFor, icon }: LikeProps): JSX.Element {
  const classes = useStyles()
  const { data } = useUserPage()
  const owner = checkOnOwner(message, data?.client)
  const shortNumber = numberToShort(message.likeCount)

  return (
    <AppBox alignItems="center">
      {owner ? (
        <LikeText icon={icon} />
      ) : (
        <LikeButton dayID={dayID} message={message} answerFor={answerFor} icon={icon} isAuthorized={!!data?.client} />
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
