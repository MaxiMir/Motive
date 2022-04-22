import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Box, IconButton, Typography } from '@mui/material'
import { NotificationDto } from 'dto'
import useLocale from 'hooks/useLocale'
import useClient from 'hooks/useClient'
import { getDistance } from 'helpers/date'
import AppEmoji from 'components/UI/AppEmoji'
import AppLink from 'components/UI/AppLink'
import AppAvatar from 'components/UI/AppAvatar'
import AppIcon from 'components/UI/AppIcon'
import { getUserUrn } from 'helpers/url'
import { getDetailsName, getNotificationInfo, getNotificationUrn } from './helper'
import { useUpdateRead } from './hook'
import i18n from './i18n'

const AppInView = dynamic(() => import('components/UI/AppInView'))

interface NotificationProps {
  notification: NotificationDto
  onClose: () => void
}

export default function Notification({ notification, onClose }: NotificationProps): JSX.Element {
  const { id, type, details, created, read } = notification
  const { name, nickname, avatar } = details.user
  const client = useClient()
  const router = useRouter()
  const { mutate } = useUpdateRead()
  const { locale } = useLocale()
  const dateDistance = getDistance(created, locale)
  const { emoji, color } = getNotificationInfo(type)
  const notificationUrn = getNotificationUrn(notification, client)
  const userUrn = getUserUrn(nickname)
  const detailsName = getDetailsName(details.name)
  const { [type]: title, view } = i18n[locale]

  const onView = () => mutate(id)

  const onClickView = () => {
    onClose()
    router.push(notificationUrn)
  }

  return (
    <Box display="flex" gap={2} height={62}>
      <Box height={55} position="relative">
        <AppLink href={userUrn} title={name} onClick={onClose}>
          <AppAvatar src={avatar} size={55} />
        </AppLink>
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
          <AppLink title={name} href={userUrn} sx={{ color, textDecoration: 'none' }} onClick={onClose}>
            <b>{name}</b>
          </AppLink>{' '}
          {title}
          {!detailsName ? '' : `: ${detailsName}`}
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Box component="span" sx={{ color: 'zen.silent', fontSize: '0.875rem' }}>
            {dateDistance}
          </Box>
          <IconButton title={view} aria-label={view} onClick={onClickView}>
            <AppIcon
              name="south_east"
              sx={{ color: read ? 'zen.silent' : 'motivation.light', fontSize: '1rem !important' }}
            />
          </IconButton>
        </Box>
      </Box>
      {!read && <AppInView onView={onView} />}
    </Box>
  )
}
