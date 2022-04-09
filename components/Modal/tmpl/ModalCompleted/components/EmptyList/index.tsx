import { Box, Typography } from '@mui/material'
import { Locale } from 'hooks/useLocale'
import AppSpinIcon from 'components/UI/AppSpinIcon'
import i18n from './i18n'

interface EmptyListProps {
  locale: Locale
}

const EmptyList = ({ locale }: EmptyListProps): JSX.Element => {
  const { title } = i18n[locale]

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex={1} gap={2}>
      <Typography color="zen.tender" variant="h6">
        {title}
      </Typography>
      <AppSpinIcon name="completed" />
    </Box>
  )
}

export default EmptyList
