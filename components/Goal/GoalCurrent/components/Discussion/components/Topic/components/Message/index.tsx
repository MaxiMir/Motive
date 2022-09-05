import dynamic from 'next/dynamic'
import { Box, Typography } from '@mui/material'
import { MessageDto } from 'dto'
import { getDistance } from 'helpers/date'
import { numberToShort } from 'helpers/prepare'
import useLocale from 'hooks/useLocale'
import { getUserHref } from 'helpers/url'
import AppLink from 'components/ui/AppLink'
import UserAvatar from 'components/User/UserAvatar'
import Menu from './components/Menu'
import LikeButton from './components/LikeButton'
import i18n from './i18n'

const Button = dynamic(() => import('@mui/material/Button'))
const SupportSign = dynamic(() => import('./components/SupportSign'))
const AppMarkdown = dynamic(() => import('components/ui/AppMarkdown'))

interface MessageProps {
  message: MessageDto
  answerFor?: number
  supportFor?: string
  onReply?: () => void
}

export default function Message({ message, answerFor, supportFor, onReply }: MessageProps) {
  const { date, user, text, edited } = message
  const { name, nickname, avatar } = user
  const { locale } = useLocale()
  const dateDistance = getDistance(date, locale)
  const href = getUserHref(nickname)
  const shortNumber = numberToShort(message.likeCount)
  const { editedText, replyButton } = i18n[locale]

  return (
    <Box display="flex" flexDirection="column" gap={1} width="100%">
      <Box display="flex" flexDirection="column" gap={1} minWidth={152}>
        <Box display="flex" alignItems="center" gap={1}>
          <UserAvatar name={name} avatar={avatar} href={href} />
          <AppLink href={href} title={user.name} sx={{ lineHeight: '20px', textDecoration: 'none' }}>
            <b>{user.name}</b>
          </AppLink>
          {supportFor && <SupportSign name={supportFor} locale={locale} />}
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
            {dateDistance}
          </Box>
          {onReply && (
            <Button size="small" aria-label={replyButton} sx={{ color: 'support.main' }} onClick={onReply}>
              {replyButton}
            </Button>
          )}
        </Box>
        <Box display="flex" alignItems="center">
          <LikeButton message={message} answerFor={answerFor} locale={locale} />
          <Typography variant="caption" sx={{ color: 'zen.silent' }}>
            {shortNumber}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
