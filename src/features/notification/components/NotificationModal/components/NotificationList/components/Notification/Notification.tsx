import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Box, IconButton, Typography } from '@mui/material'
import { toHref } from '@features/user'
import { NotificationDto } from '@features/notification/dto'
import { getNotificationHref } from '@features/notification/helpers'
import useClient from '@hooks/useClient'
import useFormatDistance from '@hooks/useFormatDistance'
import { toShortString } from '@helpers/string'
import AppEmoji from '@ui/AppEmoji'
import AppIcon from '@ui/AppIcon'
import AvatarStatus from '@components/Avatar/AvatarStatus'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'
import { useUpdateRead } from './hooks/useUpdateRead'
import { getNotificationInfo } from './helpers/content'

const AppInView = dynamic(() => import('@ui/AppInView'))

interface NotificationProps {
  notification: NotificationDto
  onClose: () => void
}

function Notification({ notification, onClose }: NotificationProps) {
  const { id, type, details, created, read } = notification
  const { name, nickname, avatar } = details.user
  const messages = useMessages(type)
  const formatDistance = useFormatDistance()
  const client = useClient()
  const { mutate } = useUpdateRead()
  const dateDistance = formatDistance(created)
  const { emoji, color } = getNotificationInfo(type)
  const notificationHref = getNotificationHref(notification, client)
  const href = toHref(nickname)
  const detailsName = !details.name ? '' : toShortString(details.name, 40)

  const onView = () => mutate(id)

  return (
    <Box display="flex" gap={2}>
      <Box height={55} position="relative">
        <Link href={href} title={name} onClick={onClose}>
          <AvatarStatus src={avatar} name={name} size={55} />
        </Link>
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
            fontSize: 11,
          }}
        >
          <AppEmoji name={emoji} onlyEmoji />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Typography sx={{ fontSize: 14 }}>
          <Box component="b" sx={{ color }}>
            <Link href={href} onClick={onClose}>
              {name}
            </Link>
          </Box>{' '}
          {messages.header}
          {detailsName && `: ${detailsName}`}
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            component="span"
            sx={{
              color: 'zen.silent',
              fontSize: 14,
            }}
          >
            {dateDistance}
          </Box>
          <TooltipArrow title={messages.viewTitle}>
            <IconButton
              size="small"
              href={notificationHref}
              sx={{
                '& span': {
                  fontSize: 16,
                },
              }}
              onClick={onClose}
            >
              <AppIcon name="south_east" sx={{ color: 'motivation.light' }} />
            </IconButton>
          </TooltipArrow>
        </Box>
      </Box>
      {!read && <AppInView onView={onView} />}
    </Box>
  )
}

export default Notification
