import { Box, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Like } from 'features/topic/like-topic'
import { MessageDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import { useFormatDistance } from 'shared/lib/hooks'
import Avatar from 'shared/ui/avatar'
import { useMessages } from './lib'
import MenuActions from './menuActions'

const Button = dynamic(() => import('@mui/material/Button'))
const Markdown = dynamic(() => import('shared/ui/markdown'))
const SupportSign = dynamic(() => import('./supportSign'))

interface MessageProps {
  message: MessageDto
  answerFor?: number
  supportFor?: string
  replyProps?: {
    disabled: boolean
    onClick: () => void
  }
}

function Message({ message, answerFor, supportFor, replyProps }: MessageProps) {
  const { date, user, text, edited } = message
  const { name, nickname, avatar, online } = user
  const messages = useMessages()
  const formatDistance = useFormatDistance()
  const dateDistance = formatDistance(date)
  const href = joinToHref(nickname)
  const direction = !answerFor ? 'row' : 'row-reverse'

  return (
    <Stack direction={direction} alignItems="flex-end" gap={1}>
      <Box pb={4}>
        <Link href={href} title={name}>
          <Avatar src={avatar} name={name} online={online} size={32} />
        </Link>
      </Box>
      <Stack
        gap={0.5}
        minWidth={{
          md: 300,
        }}
        maxWidth={500}
      >
        <Stack
          px={2}
          py={1}
          sx={(theme) => ({
            backgroundColor: !answerFor ? theme.palette.grey[900] : '#000000',
            borderRadius: `20px 20px ${!answerFor ? 16 : 4}px ${!answerFor ? 4 : 16}px`,
          })}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Box component="b" fontSize={14}>
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
        </Stack>
        <Stack direction="row" alignItems="center" gap={1} height={32}>
          <Like message={message} answerFor={answerFor} />
          {replyProps && (
            <Button size="small" sx={{ color: 'support.main' }} {...replyProps}>
              {messages.replyText}
            </Button>
          )}
          <Typography variant="caption" sx={{ color: 'zen.silent', marginLeft: 'auto' }}>
            {dateDistance}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Message
