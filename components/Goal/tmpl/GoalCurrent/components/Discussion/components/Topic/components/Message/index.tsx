import dynamic from 'next/dynamic'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { createStyles, makeStyles } from '@material-ui/core'
import { MessageDto, UserBaseDto } from 'dto'
import AppLink from 'components/UI/AppLink'
import AppBox from 'components/UI/AppBox'
import AppMarkdown from 'components/UI/AppMarkdown'
import User from 'components/User'
import Menu from './components/Menu'
import Like from './components/Like'
import Reply from './components/Reply'

const SupportSign = dynamic(() => import('./components/SupportSign'))
const Edited = dynamic(() => import('./components/Edited'))

interface MessageProps {
  goalId: number
  dayId: number
  message: MessageDto
  answerFor?: number
  supportFor?: string
  client?: UserBaseDto
  onClick?: () => void
}

export default function Message({
  goalId,
  dayId,
  message,
  answerFor,
  supportFor,
  client,
  onClick,
}: MessageProps): JSX.Element {
  const classes = useStyles()
  const { date, user, text, edited } = message
  const dateDifference = formatDistanceToNow(new Date(date), { includeSeconds: true })

  return (
    <AppBox flexDirection="column" spacing={1} flex={1}>
      <AppBox flexDirection="column" spacing={1} minWidth={152}>
        <AppBox alignItems="center" spacing={1}>
          <User tmpl="avatar" user={user} size={26} />
          <AppLink href={`/${user.id}`} title={user.name} className={classes.name}>
            <b>{user.name}</b>
          </AppLink>
          {supportFor && <SupportSign name={supportFor} />}
          {edited && <Edited />}
        </AppBox>
        <AppBox justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <AppMarkdown text={text} />
          <Menu topicId={message.id} message={message} client={client} />
        </AppBox>
      </AppBox>
      <AppBox justifyContent="space-between" alignItems="center" pr={1}>
        <AppBox alignItems="center" spacing={1}>
          <span className={classes.date}>{dateDifference} ago</span>
          {onClick && <Reply onClick={onClick} />}
        </AppBox>
        <Like goalId={goalId} dayId={dayId} message={message} answerFor={answerFor} />
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
