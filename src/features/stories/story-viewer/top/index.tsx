import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { UserBaseDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import { useFormatDistance } from 'shared/lib/hooks'
import Avatar from 'shared/ui/avatar'
import Icon from 'shared/ui/icon'

interface TopProps {
  user: UserBaseDto
  title: string
  date: string
  onClose: () => void
}

export function Top({ user, title, date, onClose }: TopProps) {
  const { nickname, name, avatar } = user
  const formatDistance = useFormatDistance()
  const { formatMessage } = useIntl()
  const closeText = formatMessage({ id: 'common.close' })
  const distance = formatDistance(date)
  const href = joinToHref(nickname)

  return (
    <Box
      position="absolute"
      left={0}
      right={0}
      zIndex={9999}
      sx={({ spacing }) => ({
        padding: spacing(3, '12px', '12px'),
        transition: 'opacity 0.5s',
      })}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Link href={href} title={name}>
          <Avatar src={avatar} name={name} size={42} />
        </Link>
        <Stack>
          <Stack direction="row" alignItems="flex-end" gap={0.5}>
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
          </Stack>
          <Typography
            component="span"
            fontSize={14}
            sx={{ textShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.1)' }}
          >
            {title}
          </Typography>
        </Stack>
        <IconButton aria-label={closeText} sx={{ marginLeft: 'auto' }} onClick={onClose}>
          <Icon name="close" />
        </IconButton>
      </Box>
    </Box>
  )
}
