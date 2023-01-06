import Link from 'next/link'
import { Box, IconButton, Typography } from '@mui/material'
import { UserBaseDto, getUserHref } from '@features/user'
import useFormatDistance from '@hooks/useFormatDistance'
import AppIcon from '@ui/AppIcon'
import UserLink from '@components/User/UserLink'
import { useMessages } from './hooks/useMessages'

interface TopProps {
  user: UserBaseDto
  title: string
  date: string
  onClose: () => void
}

function Top({ user, title, date, onClose }: TopProps): JSX.Element {
  const { nickname, name, avatar } = user
  const messages = useMessages()
  const formatDistance = useFormatDistance()
  const distance = formatDistance(date)
  const href = getUserHref(nickname)

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '24px 12px 12px',
        transition: 'opacity 0.5s',
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box display="flex" alignItems="center">
          <IconButton
            size="small"
            aria-label={messages.close}
            sx={{
              display: {
                xs: 'flex',
                sm: 'flex',
                md: 'none',
              },
            }}
            onClick={onClose}
          >
            <AppIcon name="arrow_back_ios" />
          </IconButton>
          <UserLink name={name} avatar={avatar} href={href} size={42} />
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="flex-end" gap={1}>
            <Box
              component="span"
              sx={{
                fontSize: 14,
                textShadow: '0px 1px 3px rgba(0, 0, 0, 0.36)',
              }}
            >
              <Link href={href}>{name}</Link>
            </Box>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.72)' }}>
              {distance}
            </Typography>
          </Box>
          <Typography sx={{ textShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.1)' }}>
            <b>{title}</b>
          </Typography>
        </Box>
        <IconButton
          aria-label={messages.close}
          sx={{
            marginLeft: 'auto',
            display: {
              xs: 'none',
              sm: 'none',
              md: 'flex',
            },
          }}
          onClick={onClose}
        >
          <AppIcon name="close" />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Top
