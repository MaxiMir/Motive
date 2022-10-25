import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box, IconButton, Typography } from '@mui/material'
import { NotificationDto } from 'src/common/dto'
import useClient from 'src/common/hooks/useClient'
import { getDistance } from 'src/common/helpers/date'
import { getUserHref } from 'src/common/helpers/url'
import { getDetailsName, getNotificationInfo, getNotificationHref } from 'src/common/helpers/notification'
import AppEmoji from 'src/common/ui/AppEmoji'
import AppLink from 'src/common/ui/AppLink'
import AppIcon from 'src/common/ui/AppIcon'
import UserAvatar from '@components/User/UserAvatar'
import { useUpdateRead } from './hook'

const AppInView = dynamic(() => import('src/common/ui/AppInView'))

interface NotificationProps {
  notification: NotificationDto
  onClose: () => void
}

export default function Notification({ notification, onClose }: NotificationProps) {
  const { id, type, details, created, read } = notification
  const { name, nickname, avatar } = details.user
  const { locale, formatMessage } = useIntl()
  const client = useClient()
  const { mutate } = useUpdateRead()
  const dateDistance = getDistance(created, locale)
  const { emoji, color } = getNotificationInfo(type)
  const notificationHref = getNotificationHref(notification, client)
  const href = getUserHref(nickname)
  const detailsName = getDetailsName(details.name)
  const agoText = formatMessage({ id: 'common.ago' })
  const header = formatMessage({ id: `components.notification.${type}` })
  const viewTitle = formatMessage({ id: 'common.view' })

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
          {header}
          {detailsName && `: ${detailsName}`}
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Box component="span" sx={{ color: 'zen.silent', fontSize: '0.875rem' }}>
            {dateDistance} {agoText}
          </Box>
          <IconButton href={notificationHref} title={viewTitle} aria-label={viewTitle} onClick={onClose}>
            <AppIcon name="south_east" sx={{ color: 'motivation.light', fontSize: '1rem !important' }} />
          </IconButton>
        </Box>
      </Box>
      {!read && <AppInView onView={onView} />}
    </Box>
  )
}
