import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useIntl } from 'react-intl'
import { Box, IconButton, Typography } from '@mui/material'
import { NotificationDto } from '@dto'
import { getUserHref } from '@href'
import useClient from '@hooks/useClient'
import { getDistance } from '@utils/date'
import { useDateFnsLocale } from '@hooks/useDateFnsLocale'
import { getNotificationHref } from '@helpers/notification'
import UserAvatar from '@components/User/UserAvatar'
import AppEmoji from '@ui/AppEmoji'
import AppIcon from '@ui/AppIcon'
import { toShortString } from '@helpers/string'
import { useUpdateRead } from './hook'
import { getNotificationInfo } from './helper'

const AppInView = dynamic(() => import('@ui/AppInView'))

interface NotificationProps {
  notification: NotificationDto
  onClose: () => void
}

export default function Notification({ notification, onClose }: NotificationProps) {
  const { id, type, details, created, read } = notification
  const { name, nickname, avatar } = details.user
  const { formatMessage } = useIntl()
  const fnsLocale = useDateFnsLocale()
  const client = useClient()
  const { mutate } = useUpdateRead()
  const dateDistance = getDistance(created, fnsLocale)
  const { emoji, color } = getNotificationInfo(type)
  const notificationHref = getNotificationHref(notification, client)
  const href = getUserHref(nickname)
  const detailsName = !details.name ? '' : toShortString(details.name, 40)
  const agoText = formatMessage({ id: 'common.ago' })
  const header = formatMessage({ id: `component.notification.${type}` })
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
          <Box component="b" sx={{ color }}>
            <Link href={href} onClick={onClose}>
              {name}
            </Link>
          </Box>{' '}
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
