import { Badge, Box, Button, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { getNotificationHref } from 'entities/page'
import { useViewer } from 'entities/viewer'
import { NotificationDto } from 'shared/api'
import { useFormatDistance } from 'shared/lib/hooks'
import Avatar from 'shared/ui/avatar'
import Icon from 'shared/ui/icon'
import SmallAvatar from 'shared/ui/small-avatar'
import { getAvatarSetup } from './lib'
import { useUpdateRead } from './model'

const InView = dynamic(() => import('react-intersection-observer').then((m) => m.InView))

interface NotificationCardProps {
  notification: NotificationDto
  onClose: () => void
}

function NotificationCard({ notification, onClose }: NotificationCardProps) {
  const { id, read, type, details, initiator, created } = notification
  const viewer = useViewer()
  const { mutate } = useUpdateRead()
  const { formatMessage } = useIntl()
  const formatDistance = useFormatDistance()
  const dateDistance = formatDistance(created)
  const href = getNotificationHref(notification, viewer?.nickname)
  const avatar = getAvatarSetup(type)
  const header = formatMessage({ id: `component.notification.${type}` })
  const detailsName = !details.name ? '' : `: ${details.name}`

  const onChange = (visible: boolean) => {
    if (!visible) return

    mutate(id)
  }

  return (
    <>
      <Button href={href} color="inherit" component={Link} onClick={onClose}>
        <Stack direction="row" alignItems="center" gap={2} width="100%">
          <Box position="relative" height={55}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <SmallAvatar background={avatar.background}>
                  <Icon name={avatar.icon} fontSize={12} color="common.white" />
                </SmallAvatar>
              }
            >
              <Avatar src={initiator.avatar} name={initiator.name} size={55} />
            </Badge>
          </Box>
          <Stack>
            <Typography fontSize={14}>
              <Box component="b">{initiator.name}</Box> {header}
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
      {!read && <InView onChange={onChange} />}
    </>
  )
}

export default NotificationCard
