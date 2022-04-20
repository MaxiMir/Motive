import { Locale } from 'hooks/useLocale'
import { Box, Typography } from '@mui/material'
import i18n from './i18n'

interface EmptyListProps {
  locale: Locale
}

const EmptyList = ({ locale }: EmptyListProps): JSX.Element => {
  const { title, hint } = i18n[locale]

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
      <Box display="flex" flexDirection="column" alignItems="center" width="100%">
        <Typography variant="h5" color="primary">
          {title}
        </Typography>
        <Typography>{hint}</Typography>
      </Box>
    </Box>
  )
}

export default EmptyList
