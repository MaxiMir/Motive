import dynamic from 'next/dynamic'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { makeStyles } from '@material-ui/core'
import { TopicBase, TopicType, UserBase } from 'dto'
import AppLink from 'components/UI/AppLink'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import UserCard from 'components/UserCard'
import Menu from './components/Menu'
import Like from './components/Like'
import Reply from './components/Reply'

const SupportSign = dynamic(() => import('./components/SupportSign'))

interface MessageProps extends TopicBase {
  type?: TopicType
  owner: UserBase
  answer?: boolean
  onClick?: () => void
}

export default function Message({
  date,
  user,
  owner,
  message,
  like,
  answer,
  type,
  onClick,
}: MessageProps): JSX.Element {
  const classes = useStyles()
  const { href, fullName } = user
  const dateDifference = formatDistanceToNow(new Date(date), { includeSeconds: true })

  return (
    <AppBox flexDirection="column" spacing={1} marginLeft={answer && 7}>
      <AppBox spacing={2}>
        <AppBox position="relative" height={40}>
          <UserCard type="avatar" size={40} {...user} />
          {(type === TopicType.SUPPORT || answer) && <SupportSign answer={answer} owner={owner} />}
        </AppBox>
        <AppBox flexDirection="column" spacing={1} minWidth={152} flex={1}>
          <AppLink href={href} title={fullName}>
            <b>{fullName}</b>
          </AppLink>
          <AppBox justifyContent="space-between" alignItems="flex-start" spacing={1}>
            <AppTypography>{message}</AppTypography>
            <Menu />
          </AppBox>
        </AppBox>
      </AppBox>
      <AppBox justifyContent="space-between" alignItems="center">
        <AppBox alignItems="center" spacing={1} paddingLeft={7}>
          <span className={classes.date}>{dateDifference} ago</span>
          {onClick && <Reply onClick={onClick} />}
        </AppBox>
        <Like {...like} />
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles({
  date: {
    fontSize: '0.6875rem',
    color: '#99989D',
  },
})
