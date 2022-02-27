import dynamic from 'next/dynamic'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { createStyles, makeStyles } from '@material-ui/core'
import { MessageDto } from 'dto'
import { getUserHref } from 'views/UserView/helper'
import AppLink from 'components/UI/AppLink'
import AppBox from 'components/UI/AppBox'
import AppMarkdown from 'components/UI/AppMarkdown'
import AppAvatar from 'components/UI/AppAvatar'
import Menu from './components/Menu'
import Like from './components/Like'
import Reply from './components/Reply'

const SupportSign = dynamic(() => import('./components/SupportSign'))
const Edited = dynamic(() => import('./components/Edited'))

interface MessageProps {
  message: MessageDto
  answerFor?: number
  supportFor?: string
  onReply?: () => void
}

export default function Message({ message, answerFor, supportFor, onReply }: MessageProps): JSX.Element {
  const classes = useStyles()
  const { date, user, text, edited } = message
  const dateDifference = formatDistanceToNow(new Date(date), { includeSeconds: true })
  const href = getUserHref(user.nickname)

  return (
    <AppBox flexDirection="column" spacing={1} flex={1}>
      <AppBox flexDirection="column" spacing={1} minWidth={152}>
        <AppBox alignItems="center" spacing={1}>
          <AppLink href={href}>
            <AppAvatar src={user.avatar} size={26} />
          </AppLink>
          <AppLink href={href} title={user.name} className={classes.name}>
            <b>{user.name}</b>
          </AppLink>
          {supportFor && <SupportSign name={supportFor} />}
          {edited && <Edited />}
        </AppBox>
        <AppBox justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <AppMarkdown text={text} />
          <Menu message={message} />
        </AppBox>
      </AppBox>
      <AppBox justifyContent="space-between" alignItems="center" pr={1}>
        <AppBox alignItems="center" spacing={1}>
          <span className={classes.date}>{dateDifference} ago</span>
          {onReply && <Reply onClick={onReply} />}
        </AppBox>
        <Like message={message} answerFor={answerFor} />
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
