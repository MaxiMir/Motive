import { Box, Typography } from '@mui/material'
import { Locale } from 'hooks/useLocale'
import AppFadeIcon from 'components/UI/AppFadeIcon'
import i18n from './i18n'

interface EmptyListProps {
  locale: Locale
}

export default function EmptyList({ locale }: EmptyListProps): JSX.Element {
  const { title } = i18n[locale]

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex={1} gap={2}>
      <Typography variant="h6" color="zen.tender">
        {title}
      </Typography>
      <AppFadeIcon name="followers" />
    </Box>
  )
}
