import { Box, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { UserBaseDto } from 'dto'
import i18nCommon from 'constants/i18n'
import { getUserHref } from 'helpers/url'
import { getDistance } from 'helpers/date'
import useLocale from 'hooks/useLocale'
import AppLink from 'components/ui/AppLink'
import AppIcon from 'components/ui/AppIcon'
import UserAvatar from 'components/User/UserAvatar'

interface HeaderProps {
  user: UserBaseDto
  title: string
  end: string
  onClose: () => void
}

export default function Header({ user, title, end, onClose }: HeaderProps): JSX.Element {
  const { nickname, name, avatar } = user
  const { locale } = useLocale()
  const { close } = i18nCommon[locale]
  const href = getUserHref(nickname)
  const distance = getDistance(end, locale)

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '12px',
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
            <UserAvatar name={name} avatar={avatar} href={href} size={42} />
          </Box>
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" gap={1}>
              <AppLink href={href} title={user.name} sx={{ fontSize: '0.875rem', textDecoration: 'none' }}>
                <b>{name}</b>
              </AppLink>
              <TextTitle sx={{ color: 'text.disabled' }}>/</TextTitle>
              <TextTitle sx={{ color: 'creativity.light' }}>{title}</TextTitle>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {distance}
            </Typography>
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
