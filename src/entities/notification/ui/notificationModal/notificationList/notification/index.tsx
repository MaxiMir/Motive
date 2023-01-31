import { Box, IconButton, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { getNotificationHref } from 'entities/notification/lib/helpers/href'
import { useClient } from 'entities/user'
import { NotificationDto } from 'shared/api'
import { joinToHref, toShortString } from 'shared/lib/helpers'
import { useFormatDistance } from 'shared/lib/hooks'
import Avatar from 'shared/ui/avatar'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { getNotificationInfo, useMessages, useUpdateRead } from './lib'

const InView = dynamic(() => import('shared/ui/InView'))

interface NotificationProps {
  notification: NotificationDto
  onClose: () => void
}

export function Notification({ notification, onClose }: NotificationProps) {
  const { id, type, details, created, read } = notification
  const { name, nickname, avatar } = details.user
  const messages = useMessages(type)
  const formatDistance = useFormatDistance()
  const client = useClient()
  const { mutate } = useUpdateRead()
  const dateDistance = formatDistance(created)
  const { emoji, color } = getNotificationInfo(type)
  const notificationHref = getNotificationHref(notification, client)
  const href = joinToHref(nickname)
  const detailsName = !details.name ? '' : toShortString(details.name, 40)

  const onView = () => mutate(id)

  return (
    <Stack direction="row" spacing={2}>
      <Box height={55} position="relative">
        <Link href={href} title={name} onClick={onClose}>
          <Avatar src={avatar} name={name} size={55} />
        </Link>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          bottom="-6px"
          right="2px"
          width={21}
          height={21}
          borderRadius="50%"
          fontSize={11}
          sx={{ backgroundColor: '#262626' }}
        >
          {emoji}
        </Box>
      </Box>
      <Stack justifyContent="space-between">
        <Typography sx={{ fontSize: 14 }}>
          <Box component="b" sx={{ color }}>
            <Link href={href} onClick={onClose}>
              {name}
            </Link>
          </Box>{' '}
          {messages.header}
          {detailsName && `: ${detailsName}`}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
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
              <Icon name="south_east" sx={{ color: 'motivation.light' }} />
            </IconButton>
          </TooltipArrow>
        </Stack>
      </Stack>
      {!read && <InView onView={onView} />}
    </Stack>
  )
}
