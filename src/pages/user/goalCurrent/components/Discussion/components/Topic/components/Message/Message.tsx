import { Box, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { MessageDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import { useFormatDistance } from 'shared/lib/hooks'
import Avatar from 'shared/ui/avatar'
import Like from './components/Like'
import MenuActions from './components/MenuActions'
import { useMessages } from './hooks/useMessages'

const Button = dynamic(() => import('@mui/material/Button'))
const Markdown = dynamic(() => import('shared/ui/markdown'))
const SupportSign = dynamic(() => import('./components/SupportSign'))

interface MessageProps {
  message: MessageDto
  answerFor?: number
  supportFor?: string
  onReply?: () => void
}

function Message({ message, answerFor, supportFor, onReply }: MessageProps) {
  const { date, user, text, edited } = message
  const { name, nickname, avatar, online } = user
  const messages = useMessages()
  const formatDistance = useFormatDistance()
  const dateDistance = formatDistance(date)
  const href = joinToHref(nickname)
  const direction = !answerFor ? 'row' : 'row-reverse'

  return (
    <Stack direction={direction} alignItems="flex-end" spacing={1}>
      <Link href={href} title={name}>
        <Avatar src={avatar} name={name} online={online} size={32} />
      </Link>
      <Stack
        spacing={1}
        width="100%"
        px={2}
        py={1}
        sx={(theme) => ({
          backgroundColor: !answerFor ? theme.palette.grey[900] : '#111a47',
          borderRadius: `20px 20px ${!answerFor ? 16 : 4}px ${!answerFor ? 4 : 16}px`,
        })}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Box component="b">
            <Link href={href} title={user.name}>
              {user.name}
            </Link>
          </Box>
          {supportFor && <SupportSign name={supportFor} />}
          {edited && (
            <Box component="span" fontSize={11} color="zen.silent">
              {messages.editedText}
            </Box>
          )}
          <MenuActions message={message} />
        </Box>
        <Markdown text={text} />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
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
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Message
