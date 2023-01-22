import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { toHref } from '@features/user'
import { NotificationDto } from '@features/notification/dto'
import { getNotificationHref } from '@features/notification/helpers'
import useClient from '@hooks/useClient'
import useFormatDistance from '@hooks/useFormatDistance'
import { toShortString } from '@helpers/string'
import Emoji from '@ui/Emoji'
import Icon from '@ui/Icon'
import AvatarStatus from '@components/AvatarStatus'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'
import { useUpdateRead } from './hooks/useUpdateRead'
import { getNotificationInfo } from './helpers/content'

const InView = dynamic(() => import('@ui/InView'))

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
    <Stack direction="row" spacing={2}>
      <Box height={55} position="relative">
        <Link href={href} title={name} onClick={onClose}>
          <AvatarStatus src={avatar} name={name} size={55} />
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
          <Emoji name={emoji} onlyEmoji />
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

export default Notification
