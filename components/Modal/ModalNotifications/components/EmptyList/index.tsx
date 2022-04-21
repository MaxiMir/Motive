import { Box, Typography } from '@mui/material'
import useLocale from 'hooks/useLocale'
import AppFadeIcon from 'components/UI/AppFadeIcon'
import i18n from './i18n'

export default function EmptyList(): JSX.Element {
  const { locale } = useLocale()
  const { title } = i18n[locale]

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flex={1} height="100%">
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Typography variant="h6">{title}</Typography>
        <AppFadeIcon name="notification" />
      </Box>
    </Box>
  )
}
