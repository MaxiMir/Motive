import { Box, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { TopicLike } from 'features/topic/like-topic'
import { UserStatus } from 'entities/user'
import { MessageDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import { useFormatDistance } from 'shared/lib/hooks'
import Avatar from 'shared/ui/avatar'
import MenuActions from './menuActions'

const Button = dynamic(() => import('@mui/material/Button'))
const Markdown = dynamic(() => import('shared/ui/markdown'))
const SupportSign = dynamic(() => import('entities/discussion').then((m) => m.SupportSign))

interface MessageProps {
  message: MessageDto
  answerFor?: MessageDto
  supportFor?: string
  replyProps?: {
    disabled: boolean
    onClick: () => void
  }
}

function Message({ message, answerFor, supportFor, replyProps }: MessageProps) {
  const { date, user, text, edited } = message
  const { name, nickname, avatar, online } = user
  const { formatMessage } = useIntl()
  const formatDistance = useFormatDistance()
  const dateDistance = formatDistance(date)
  const href = joinToHref(nickname)
  const avatarSize = !answerFor ? 32 : 24
  const textWithUser = !answerFor ? text : [`**${answerFor.user.name}**`, text].join(' ')
  const editedText = formatMessage({ id: 'common.edited' })
  const replyText = formatMessage({ id: 'common.reply' })

  return (
    <Stack direction="row" gap={1} width="100%">
      {answerFor && (
        <Box
          sx={(theme) => ({
            position: 'relative',
            top: -47,
            right: -16,
            width: 24,
            mb: 5,
            mr: 2,
            height: 'calc(100% - 8px)',
            borderBottom: '2px solid',
            borderLeft: '2px solid',
            borderColor: theme.palette.grey[800],
            borderBottomLeftRadius: 12,
          })}
        />
      )}
      <Box display="flex" alignItems="flex-end" pb={5}>
        <Link href={href} title={name}>
          <Avatar src={avatar} name={name} size={avatarSize} />
        </Link>
      </Box>
      <Stack gap={0.5} flex={1} alignItems="flex-start">
        <Stack
          px={2}
          py={1}
          mb={1}
          sx={(theme) => ({
            backgroundColor: theme.palette.grey[900],
            borderRadius: `20px 20px ${!answerFor ? 16 : 4}px ${!answerFor ? 4 : 16}px`,
          })}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <UserStatus online={online}>
              <Box component="b" fontSize={14}>
                <Link href={href} title={user.name}>
                  {user.name}
                </Link>
              </Box>
            </UserStatus>
            {supportFor && <SupportSign name={supportFor} />}
            {edited && (
              <Box component="span" fontSize={11} color="zen.silent">
                {editedText}
              </Box>
            )}
            <MenuActions message={message} />
          </Box>
          <Markdown text={textWithUser} />
        </Stack>
        <Stack direction="row" alignItems="center" gap={1} width="100%" height={32} pl={2}>
          <Typography variant="caption" color="zen.silent">
            {dateDistance}
          </Typography>
          {replyProps && (
            <Button size="small" sx={{ color: 'support.main' }} {...replyProps}>
              {replyText}
            </Button>
          )}
          <Box marginLeft="auto">
            <TopicLike message={message} parentId={answerFor?.id} />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Message
