import dynamic from 'next/dynamic'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { enUS, ru } from 'date-fns/locale'
import { Box, Typography } from '@mui/material'
import { MessageDto } from 'dto'
import { numberToShort } from 'helpers/prepare'
import useLocale from 'hooks/useLocale'
import { getUserHref } from 'views/UserView/helper'
import AppLink from 'components/UI/AppLink'
import AppMarkdown from 'components/UI/AppMarkdown'
import AppAvatar from 'components/UI/AppAvatar'
import Menu from './components/Menu'
import LikeButton from './components/LikeButton'
import i18n from './i18n'

const Button = dynamic(() => import('@mui/material/Button'))
const SupportSign = dynamic(() => import('./components/SupportSign'))

interface MessageProps {
  message: MessageDto
  answerFor?: number
  supportFor?: string
  onReply?: () => void
}

export default function Message({ message, answerFor, supportFor, onReply }: MessageProps): JSX.Element {
  const { date, user, text, edited } = message
  const { locale } = useLocale()
  const fnsLocale = locale === 'ru' ? ru : enUS
  const dateDifference = formatDistanceToNow(new Date(date), { includeSeconds: true, locale: fnsLocale })
  const href = getUserHref(user.nickname)
  const shortNumber = numberToShort(message.likeCount)
  const { editedText, agoText, replyButton } = i18n[locale]

  return (
    <Box display="flex" flexDirection="column" gap={1} width="100%">
      <Box display="flex" flexDirection="column" gap={1} minWidth={152}>
        <Box display="flex" alignItems="center" gap={1}>
          <AppLink href={href} title={user.name}>
            <AppAvatar src={user.avatar} size={26} />
          </AppLink>
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
            {dateDifference} {agoText}
          </Box>
          {onReply && (
            <Button aria-label="Reply" sx={{ color: 'support.main' }} onClick={onReply}>
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
