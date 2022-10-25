import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import AppFadeIcon from 'src/common/ui/AppFadeIcon'
import i18n from './i18n'

export default function EmptyList() {
  const { locale } = useIntl()
  const { title } = i18n[locale]

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} width="100%">
      <Typography variant="h6">{title}</Typography>
      <AppFadeIcon name="notification" />
    </Box>
  )
}
