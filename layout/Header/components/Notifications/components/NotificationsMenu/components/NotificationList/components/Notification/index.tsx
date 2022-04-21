import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Box, Typography, ListItemIcon, MenuItem } from '@mui/material'
import { NotificationDto } from 'dto'
import useLocale from 'hooks/useLocale'
import useClient from 'hooks/useClient'
import { getDistance } from 'helpers/date'
import UserAvatar from 'components/User/UserAvatar'
import AppEmoji from 'components/UI/AppEmoji'
import { getNotificationInfo, getUrn } from './helper'
import { useUpdateRead } from './hook'
import i18n from './i18n'

const AppInView = dynamic(() => import('components/UI/AppInView'))

interface NotificationProps {
  notification: NotificationDto
  onClose: () => void
}

export default function Notification({ notification, onClose }: NotificationProps): JSX.Element {
  const { id, type, details, created, read } = notification
  const { user } = details
  const router = useRouter()
  const client = useClient()
  const { mutate } = useUpdateRead()
  const { locale } = useLocale()
  const dateDistance = getDistance(created, locale)
  const { emoji, color } = getNotificationInfo(type)
  const urn = getUrn(notification, client)
  const title = i18n[locale][type]

  const onClick = () => {
    onClose()
    router.push(urn)
  }

  const onView = () => mutate(id)

  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon sx={{ position: 'relative' }}>
        <UserAvatar user={user} />
        <Box component="span" sx={{ position: 'absolute', bottom: '-5px', right: '7px', fontSize: '0.625rem' }}>
          <AppEmoji name={emoji} onlyEmoji />
        </Box>
      </ListItemIcon>
      <Box display="flex" flexDirection="column">
        <Typography variant="caption">
          <Box component="span" sx={{ color }}>
            {user.name}
          </Box>{' '}
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
