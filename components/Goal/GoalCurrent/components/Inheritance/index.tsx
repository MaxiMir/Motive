import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { UserBaseDto } from 'dto'
import useLocale from 'hooks/useLocale'
import { getUserHref } from 'helpers/url'
import UserAvatar from 'components/User/UserAvatar'
import i18n from './i18n'

interface InheritedProps {
  owner: UserBaseDto
}

export default function Inheritance({ owner }: InheritedProps) {
  const { name, nickname, avatar } = owner
  const { locale } = useLocale()
  const href = getUserHref(nickname)
  const width = locale === 'ru' ? 100 : 90
  const { title } = i18n[locale]

  return (
    <InheritanceBox display="flex" justifyContent="center" width={width}>
      <Box display="flex" alignItems="center" gap={0.5}>
        <Typography variant="caption">
          <b>{title}</b>
        </Typography>
        <UserAvatar name={name} avatar={avatar} href={href} />
      </Box>
    </InheritanceBox>
  )
}

const InheritanceBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -19,
  left: '50%',
  padding: '4px',
  transform: 'translateX(-50%)',
  borderRadius: '20px',
  background: `linear-gradient(90deg, ${theme.palette.support.dark} 0%, ${theme.palette.creativity.dark} 100%)`,
}))
