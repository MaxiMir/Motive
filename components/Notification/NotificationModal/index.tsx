import dynamic from 'next/dynamic'
import { Box, IconButton, Typography } from '@mui/material'
import { NotificationDto } from 'dto'
import useLocale from 'hooks/useLocale'
import useClient from 'hooks/useClient'
import { getDistance } from 'helpers/date'
import { getUserHref } from 'helpers/url'
import AppEmoji from 'components/ui/AppEmoji'
import AppLink from 'components/ui/AppLink'
import AppIcon from 'components/ui/AppIcon'
import UserAvatar from 'components/User/UserAvatar'
import { getDetailsName, getNotificationInfo, getNotificationHref } from './helper'
import { useUpdateRead } from './hook'
import i18n from './i18n'

const AppInView = dynamic(() => import('components/ui/AppInView'))

interface NotificationModalProps {
  notification: NotificationDto
  onClose: () => void
}

export default function NotificationModal({ notification, onClose }: NotificationModalProps) {
  const { id, type, details, created, read } = notification
  const { name, nickname, avatar } = details.user
  const client = useClient()
  const { mutate } = useUpdateRead()
  const { locale } = useLocale()
  const dateDistance = getDistance(created, locale)
  const { emoji, color } = getNotificationInfo(type)
  const notificationHref = getNotificationHref(notification, client)
  const href = getUserHref(nickname)
  const detailsName = getDetailsName(details.name)
  const { [type]: title, view } = i18n[locale]

  const onView = () => mutate(id)

  return (
    <Box display="flex" gap={2}>
      <Box height={55} position="relative">
        <UserAvatar name={name} avatar={avatar} href={href} size={55} onClick={onClose} />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: 'absolute',
            bottom: '-6px',
            right: '2px',
            width: 21,
            height: 21,
            backgroundColor: '#262626',
            borderRadius: '50%',
            fontSize: '0.6875rem',
          }}
        >
          <AppEmoji name={emoji} onlyEmoji />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Typography sx={{ fontSize: '0.875rem' }}>
          <AppLink title={name} href={href} sx={{ color, textDecoration: 'none' }} onClick={onClose}>
            <b>{name}</b>
          </AppLink>{' '}
          {title}
          {!detailsName ? '' : `: ${detailsName}`}
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Box component="span" sx={{ color: 'zen.silent', fontSize: '0.875rem' }}>
            {dateDistance}
          </Box>
          <IconButton href={notificationHref} title={view} aria-label={view} onClick={onClose}>
            <AppIcon name="south_east" sx={{ color: 'motivation.light', fontSize: '1rem !important' }} />
          </IconButton>
        </Box>
      </Box>
      {!read && <AppInView onView={onView} />}
    </Box>
  )
}
