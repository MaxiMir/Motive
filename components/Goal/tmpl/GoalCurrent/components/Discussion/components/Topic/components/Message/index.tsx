import dynamic from 'next/dynamic'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { createStyles, makeStyles } from '@material-ui/core'
import { TopicBaseDto, TopicType, UserBaseDto } from 'dto'
import AppLink from 'components/UI/AppLink'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import User from 'components/User'
import Menu from './components/Menu'
import Like from './components/Like'
import Reply from './components/Reply'

const SupportSign = dynamic(() => import('./components/SupportSign'))

interface MessageProps extends TopicBaseDto {
  type?: TopicType
  owner: UserBaseDto
  onClick?: () => void
}

export default function Message({ id, date, user, owner, message, like, type, onClick }: MessageProps): JSX.Element {
  const classes = useStyles()
  const { id: userId, name } = user
  const dateDifference = formatDistanceToNow(new Date(date), { includeSeconds: true })

  return (
    <AppBox flexDirection="column" spacing={1} flex={1}>
      <AppBox flexDirection="column" spacing={2} minWidth={152}>
        <AppBox alignItems="center" spacing={1}>
          <User tmpl="avatar" user={user} size={26} />
          <AppLink href={`/${userId}`} title={name} className={classes.name}>
            <b>{user.name}</b>
          </AppLink>
          {type === TopicType.SUPPORT && <SupportSign owner={owner} />}
        </AppBox>
        <AppBox justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <AppTypography>{message}</AppTypography>
          <Menu />
        </AppBox>
      </AppBox>
      <AppBox justifyContent="space-between" alignItems="center" pr={1}>
        <AppBox alignItems="center" spacing={1}>
          <span className={classes.date}>{dateDifference} ago</span>
          {onClick && <Reply onClick={onClick} />}
        </AppBox>
        <Like {...like} messageId={id} />
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    name: {
      lineHeight: '20px',
    },
    date: {
      fontSize: '0.6875rem',
      color: theme.text.silent,
    },
  }),
)
