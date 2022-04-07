import { Typography } from '@mui/material'
import { UserBaseDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import User from 'components/User'
import i18n from './i18n'

interface InheritedProps {
  owner: UserBaseDto
  locale: Locale
}

export default function Inheritance({ owner, locale }: InheritedProps): JSX.Element {
  const { creator } = i18n[locale]

  return (
    <AppBox alignItems="center" gap={1}>
      <Typography variant="caption">{creator}</Typography>
      <User tmpl="avatar" user={owner} />
    </AppBox>
  )
}
