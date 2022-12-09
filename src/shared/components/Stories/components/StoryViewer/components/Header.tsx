import Link from 'next/link'
import { useIntl } from 'react-intl'
import { Box, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { getUserHref } from '@href'
import { UserBaseDto } from '@features/user'
import useFormatDistance from '@hooks/useFormatDistance'
import AppIcon from '@ui/AppIcon'
import UserLink from '@components/User/UserLink'

interface HeaderProps {
  user: UserBaseDto
  title: string
  date: string
  onClose: () => void
}

function Header({ user, title, date, onClose }: HeaderProps): JSX.Element {
  const { nickname, name, avatar } = user
  const { formatMessage } = useIntl()
  const formatDistance = useFormatDistance()
  const distance = formatDistance(date)
  const href = getUserHref(nickname)
  const close = formatMessage({ id: 'common.close' })

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '1.5rem 0.75rem 0.75rem',
        transition: 'opacity 0.5s',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={2}>
          <Box display="flex" alignItems="center">
            <IconButton
              size="small"
              aria-label={close}
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
            <Box component="b">
              <Link href={href}>{name}</Link>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <TextTitle sx={{ color: 'motivation.light' }}>
                <b>{title}</b>
              </TextTitle>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {distance}
              </Typography>
            </Box>
          </Box>
        </Box>
        <IconButton
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'flex',
            },
          }}
          aria-label={close}
          onClick={onClose}
        >
          <AppIcon name="close" />
        </IconButton>
      </Box>
    </Box>
  )
}

const TextTitle = styled(Typography)({
  fontSize: '0.875rem',
  fontWeight: 'bold',
})

export default Header
