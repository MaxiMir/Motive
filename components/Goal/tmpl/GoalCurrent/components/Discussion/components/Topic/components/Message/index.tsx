import dynamic from 'next/dynamic'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Box } from '@mui/material'
import { MessageDto } from 'dto'
import { getUserHref } from 'views/UserView/helper'
import AppLink from 'components/UI/AppLink'
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
  const { date, user, text, edited } = message
  const dateDifference = formatDistanceToNow(new Date(date), { includeSeconds: true })
  const href = getUserHref(user.nickname)

  return (
    <Box display="flex" flexDirection="column" gap={1} flex={1}>
      <Box display="flex" flexDirection="column" gap={1} minWidth={152}>
        <Box display="flex" alignItems="center" gap={1}>
          <AppLink href={href} title={user.name}>
            <AppAvatar src={user.avatar} size={26} />
          </AppLink>
          <AppLink href={href} title={user.name} sx={{ lineHeight: '20px', textDecoration: 'none' }}>
            <b>{user.name}</b>
          </AppLink>
          {supportFor && <SupportSign name={supportFor} />}
          {edited && <Edited />}
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1}>
          <AppMarkdown text={text} />
          <Menu message={message} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" pr={1}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box component="span" sx={{ fontSize: '0.6875rem', color: 'zen.silent' }}>
            {dateDifference} ago
          </Box>
          {onReply && <Reply onClick={onReply} />}
        </Box>
        <Like message={message} answerFor={answerFor} />
      </Box>
    </Box>
  )
}
