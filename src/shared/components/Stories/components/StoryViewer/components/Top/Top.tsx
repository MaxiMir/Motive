import Link from 'next/link'
import { Box, IconButton, Typography } from '@mui/material'
import { UserBaseDto, toHref } from '@features/user'
import useFormatDistance from '@hooks/useFormatDistance'
import AppIcon from '@ui/AppIcon'
import AvatarStatus from '@components/Avatar/AvatarStatus'
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
  const href = toHref(nickname)

  return (
    <Box
      sx={({ spacing }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: spacing(3, '12px', '12px'),
        transition: 'opacity 0.5s',
      })}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Link href={href} title={name}>
          <AvatarStatus src={avatar} name={name} size={42} />
        </Link>
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="flex-end" gap={0.5}>
            <Typography
              variant="caption"
              component="span"
              sx={{ textShadow: '0px 1px 3px rgba(0, 0, 0, 0.36)' }}
            >
              <Link href={href}>{name}</Link>
            </Typography>
            <Typography
              variant="caption"
              component="span"
              sx={{ color: 'rgba(255, 255, 255, 0.72)' }}
            >
              {distance}
            </Typography>
          </Box>
          <Typography
            component="span"
            sx={{ fontSize: 14, textShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.1)' }}
          >
            {title}
          </Typography>
        </Box>
        <IconButton aria-label={messages.close} sx={{ marginLeft: 'auto' }} onClick={onClose}>
          <AppIcon name="close" />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Top
