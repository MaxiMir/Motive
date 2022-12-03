import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import { getUserHref } from '@href'
import { MessageDto } from '@dto'
import useDateDistance from '@hooks/useDateDistance'
import useFormatNumber from '@hooks/useFormatNumber'
import UserLink from '@components/User/UserLink'
import useMessages from './hooks/useMessages'
import Menu from './components/Menu'
import LikeButton from './components/LikeButton'

const Button = dynamic(() => import('@mui/material/Button'))
const AppMarkdown = dynamic(() => import('@ui/AppMarkdown'))
const SupportSign = dynamic(() => import('./components/SupportSign'))

interface MessageProps {
  message: MessageDto
  answerFor?: number
  supportFor?: string
  onReply?: () => void
}

function Message({ message, answerFor, supportFor, onReply }: MessageProps) {
  const { date, user, text, edited } = message
  const { name, nickname, avatar } = user
  const messages = useMessages()
  const formatNumber = useFormatNumber()
  const getDateDistance = useDateDistance()
  const dateDistance = getDateDistance(date)
  const href = getUserHref(nickname)
  const formattedNumber = formatNumber(message.likeCount)

  return (
    <Box display="flex" flexDirection="column" gap={1} width="100%">
      <Box display="flex" flexDirection="column" gap={1} minWidth={152}>
        <Box display="flex" alignItems="center" gap={1}>
          <UserLink name={name} avatar={avatar} href={href} />
          <Box component="b">
            <Link href={href} title={user.name}>
              {user.name}
            </Link>
          </Box>
          {supportFor && <SupportSign name={supportFor} />}
          {edited && (
            <Box component="span" sx={{ fontSize: '0.6875rem', color: 'zen.silent' }}>
              {messages.editedText}
            </Box>
          )}
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1}>
          <AppMarkdown text={text} />
          <Menu message={message} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" pr={1}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box component="span" sx={{ fontSize: '0.6875rem', color: 'zen.silent' }}>
            {dateDistance} {messages.agoText}
          </Box>
          {onReply && (
            <Button size="small" aria-label={messages.replyText} sx={{ color: 'support.main' }} onClick={onReply}>
              {messages.replyText}
            </Button>
          )}
        </Box>
        <Box display="flex" alignItems="center">
          <LikeButton message={message} answerFor={answerFor} />
          <Typography variant="caption" sx={{ color: 'zen.silent' }}>
            {formattedNumber}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Message
