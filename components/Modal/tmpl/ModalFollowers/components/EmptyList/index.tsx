import { Typography } from '@mui/material'
import { Locale } from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import AppFadeIcon from 'components/UI/AppFadeIcon'
import i18n from './i18n'

interface EmptyListProps {
  locale: Locale
}

export default function EmptyList({ locale }: EmptyListProps): JSX.Element {
  const { title } = i18n[locale]

  return (
    <AppBox flexDirection="column" alignItems="center" justifyContent="center" flex={1} gap={2}>
      <Typography color="primary" variant="h6">
        {title}
      </Typography>
      <AppFadeIcon name="followers" />
    </AppBox>
  )
}
