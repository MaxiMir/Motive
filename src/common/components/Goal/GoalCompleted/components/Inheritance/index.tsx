import { Box, Typography } from '@mui/material'
import { UserBaseDto } from 'src/common/dto'
import { Locale } from 'src/common/hooks/useSetLocale'
import { getUserHref } from 'src/common/helpers/url'
import UserAvatar from '@components/User/UserAvatar'
import i18n from './i18n'

interface InheritedProps {
  owner: UserBaseDto
  locale: Locale
}

export default function Inheritance({ owner, locale }: InheritedProps) {
  const { name, nickname, avatar } = owner
  const href = getUserHref(nickname)
  const { creator } = i18n[locale]

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="caption">{creator}:</Typography>
      <UserAvatar name={name} avatar={avatar} href={href} />
    </Box>
  )
}
