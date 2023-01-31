import { Box, IconButton, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { NotificationDto } from 'shared/api'
import { joinToHref, toShortString } from 'shared/lib/helpers'
import { useFormatDistance } from 'shared/lib/hooks'
import Avatar from 'shared/ui/avatar'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { getNotificationInfo, useMessages } from './lib'

interface NotificationInfoProps {
  notification: NotificationDto
  href: string
  onClick?: () => void
}

export function NotificationInfo({ notification, href, onClick }: NotificationInfoProps) {
  const { type, details, created } = notification
  const { name, avatar, nickname } = details.user
  const messages = useMessages(type)
  const formatDistance = useFormatDistance()
  const dateDistance = formatDistance(created)
  const { emoji, color } = getNotificationInfo(type)
  const detailsName = !details.name ? '' : toShortString(details.name, 40)
  const userHref = joinToHref(nickname)

  return (
    <Stack direction="row" spacing={2}>
      <Box height={55} position="relative">
        <Link href={userHref} title={name} onClick={onClick}>
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
            <Link href={userHref} onClick={onClick}>
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
              href={href}
              sx={{
                '& span': {
                  fontSize: 16,
                },
              }}
              onClick={onClick}
            >
              <Icon name="south_east" sx={{ color: 'motivation.light' }} />
            </IconButton>
          </TooltipArrow>
        </Stack>
      </Stack>
    </Stack>
  )
}
