import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Box } from '@mui/material'
import { getUserHref } from '@href'
import { MessageDto } from '@dto'
import useFormatDistance from '@hooks/useFormatDistance'
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
  const formatDistance = useFormatDistance()
  const dateDistance = formatDistance(date)
  const href = getUserHref(nickname)
  const flexDirection = !answerFor ? 'row' : 'row-reverse'
  const backgroundColor = !answerFor ? '#213040' : '#060d15'

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box display="flex" alignItems="flex-end" flexDirection={flexDirection} gap={1}>
        <UserLink name={name} avatar={avatar} href={href} size={32} />
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          p={1}
          sx={{
            minWidth: '13.125rem',
            maxWidth: '80%',
            backgroundColor,
            borderBottomLeftRadius: 4,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
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
            <Menu message={message} />
          </Box>
          <AppMarkdown text={text} />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <LikeButton message={message} answerFor={answerFor} />
            <Box component="span" sx={{ fontSize: '0.6875rem', color: 'zen.silent' }}>
              {dateDistance}
            </Box>
          </Box>
        </Box>
      </Box>
      {onReply && (
        <Box pl={6}>
          <Button size="small" aria-label={messages.replyText} sx={{ color: 'support.main' }} onClick={onReply}>
            {messages.replyText}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Message
