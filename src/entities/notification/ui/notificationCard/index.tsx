import { Avatar as MuiAvatar, Box, Button, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { NotificationDto } from 'shared/api'
import { Emoji } from 'shared/config'
import { useFormatDistance } from 'shared/lib/hooks'
import Avatar from 'shared/ui/avatar'

interface NotificationCardProps {
  notification: NotificationDto
  href: string
  onClose?: () => void
}

export function NotificationCard({ notification, href, onClose }: NotificationCardProps) {
  const { type, details, initiator, created } = notification
  const { name, avatar } = initiator
  const { formatMessage } = useIntl()
  const formatDistance = useFormatDistance()
  const dateDistance = formatDistance(created)
  const emoji = Emoji[type] || Emoji.notification
  const header = formatMessage({ id: `component.notification.${type}` })
  const detailsName = !details.name ? '' : `: ${details.name}`

  return (
    <Button href={href} color="inherit" component={Link} onClick={onClose}>
      <Stack direction="row" alignItems="center" gap={2} width="100%">
        <Box position="relative" height={55}>
          <Avatar src={avatar} name={name} size={55} />
          <AvatarNotification>{emoji}</AvatarNotification>
        </Box>
        <Stack>
          <Typography fontSize={14}>
            <Box component="b">{name}</Box> {header}
            {detailsName}
          </Typography>
          <Stack direction="row" alignItems="center" gap={2}>
            <Box component="span" fontSize={12} color="zen.silent">
              {dateDistance}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Button>
  )
}

const AvatarNotification = styled(MuiAvatar)(({ theme }) => ({
  position: 'absolute',
  bottom: '-3px',
  right: '2px',
  width: 21,
  height: 21,
  backgroundColor: theme.palette.grey[900],
  fontSize: 14,
}))
