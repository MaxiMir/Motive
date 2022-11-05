import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import { MessageDto } from '@dto'
import { getDistance } from '@utils/date'
import { numberToShort } from '@helpers/prepare'
import { getUserHref } from '@href'
import UserAvatar from '@components/User/UserAvatar'
import Menu from './components/Menu'
import LikeButton from './components/LikeButton'

const Button = dynamic(() => import('@mui/material/Button'))
const SupportSign = dynamic(() => import('./components/SupportSign'))
const AppMarkdown = dynamic(() => import('@ui/AppMarkdown'))

interface MessageProps {
  message: MessageDto
  answerFor?: number
  supportFor?: string
  onReply?: () => void
}

export default function Message({ message, answerFor, supportFor, onReply }: MessageProps) {
  const { date, user, text, edited } = message
  const { name, nickname, avatar } = user
  const { locale, formatMessage } = useIntl()
  const dateDistance = getDistance(date, locale)
  const href = getUserHref(nickname)
  const shortNumber = numberToShort(message.likeCount)
  const agoText = formatMessage({ id: 'common.ago' })
  const editedText = formatMessage({ id: 'common.edited' })
  const replyText = formatMessage({ id: 'common.reply' })

  return (
    <Box display="flex" flexDirection="column" gap={1} width="100%">
      <Box display="flex" flexDirection="column" gap={1} minWidth={152}>
        <Box display="flex" alignItems="center" gap={1}>
          <UserAvatar name={name} avatar={avatar} href={href} />
          <Box component="b">
            <Link href={href} title={user.name}>
              {user.name}
            </Link>
          </Box>
          {supportFor && <SupportSign name={supportFor} />}
          {edited && (
            <Box component="span" sx={{ fontSize: '0.6875rem', color: 'zen.silent' }}>
              {editedText}
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
            {dateDistance} {agoText}
          </Box>
          {onReply && (
            <Button size="small" aria-label={replyText} sx={{ color: 'support.main' }} onClick={onReply}>
              {replyText}
            </Button>
          )}
        </Box>
        <Box display="flex" alignItems="center">
          <LikeButton message={message} answerFor={answerFor} />
          <Typography variant="caption" sx={{ color: 'zen.silent' }}>
            {shortNumber}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
