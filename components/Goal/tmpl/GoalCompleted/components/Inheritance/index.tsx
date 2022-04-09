import { Box, Typography } from '@mui/material'
import { UserBaseDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import User from 'components/User'
import i18n from './i18n'

interface InheritedProps {
  owner: UserBaseDto
  locale: Locale
}

export default function Inheritance({ owner, locale }: InheritedProps): JSX.Element {
  const { creator } = i18n[locale]

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="caption">{creator}</Typography>
      <User tmpl="avatar" user={owner} />
    </Box>
  )
}
