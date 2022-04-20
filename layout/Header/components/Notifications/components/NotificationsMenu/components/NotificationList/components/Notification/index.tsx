import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Box, Typography, ListItemIcon, MenuItem } from '@mui/material'
import { NotificationDto } from 'dto'
import useLocale from 'hooks/useLocale'
import { getDistance } from 'helpers/date'
import User from 'components/User'
import AppLink from 'components/UI/AppLink'
import AppEmoji from 'components/UI/AppEmoji'
import { getUserUrn } from 'helpers/url'
import { getNotificationInfo } from './helper'
import { useUpdateRead } from './hook'
import i18n from './i18n'

const AppInView = dynamic(() => import('components/UI/AppInView'))

export default function Notification(notification: NotificationDto): JSX.Element {
  const { id, type, details, created, read } = notification
  const { user } = details
  const router = useRouter()
  const { mutate } = useUpdateRead()
  const userHref = getUserUrn(user.nickname)
  const { locale } = useLocale()
  const dateDistance = getDistance(created, locale)
  const { emoji, color, href } = getNotificationInfo(notification)
  const title = i18n[locale][type]

  const onClick = () => router.push(href)

  const onView = () => mutate(id)

  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon sx={{ position: 'relative' }}>
        <User tmpl="avatar" user={user} />
        <Box component="span" sx={{ position: 'absolute', bottom: '-5px', right: '7px', fontSize: '0.625rem' }}>
          <AppEmoji name={emoji} onlyEmoji />
        </Box>
      </ListItemIcon>
      <Box display="flex" flexDirection="column">
        <Typography variant="caption">
          <AppLink href={userHref} sx={{ color, textDecoration: 'none' }}>
            {user.name}
          </AppLink>{' '}
          {title}
        </Typography>
        <Box component="span" sx={{ fontSize: '0.6875rem', color: 'zen.silent' }}>
          {dateDistance}
        </Box>
      </Box>
      {!read && <AppInView onView={onView} />}
    </MenuItem>
  )
}
