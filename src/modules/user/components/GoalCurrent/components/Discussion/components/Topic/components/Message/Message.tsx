import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import { indigo } from '@mui/material/colors'
import { getUserHref } from '@features/user'
import { MessageDto } from '@features/topic'
import useFormatDistance from '@hooks/useFormatDistance'
import UserLink from '@components/User/UserLink'
import { useMessages } from './hooks/useMessages'
import MenuActions from './components/MenuActions'
import Like from './components/Like'

const Button = dynamic(() => import('@mui/material/Button'))
const AppMarkdown = dynamic(() => import('@features/markdown'))
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

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box display="flex" alignItems="flex-end" flexDirection={flexDirection} gap={1}>
        <UserLink name={name} avatar={avatar} href={href} size={32} />
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          px={2}
          py={1}
          sx={(theme) => ({
            width: '100%',
            backgroundColor: !answerFor ? theme.palette.grey[900] : indigo[600],
            borderRadius: `20px 20px ${!answerFor ? 16 : 4}px ${!answerFor ? 4 : 16}px`,
          })}
        >
          <Box display="flex" justifyContent="space-between" gap={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <Box component="b">
                <Link href={href} title={user.name}>
                  {user.name}
                </Link>
              </Box>
              {supportFor && <SupportSign name={supportFor} />}
              {edited && (
                <Box
                  component="span"
                  sx={{
                    fontSize: 11,
                    color: 'zen.silent',
                  }}
                >
                  {messages.editedText}
                </Box>
              )}
            </Box>
            <MenuActions message={message} />
          </Box>
          <AppMarkdown text={text} />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" sx={({ palette }) => ({ color: palette.grey[300] })}>
                {dateDistance}
              </Typography>
              {onReply && (
                <Button size="small" sx={{ color: 'support.main' }} onClick={onReply}>
                  {messages.replyText}
                </Button>
              )}
            </Box>
            <Like message={message} answerFor={answerFor} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Message
