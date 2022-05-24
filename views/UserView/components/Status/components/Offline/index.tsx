import { Box } from '@mui/material'
import { Locale } from 'hooks/useLocale'
import { getDistance } from 'helpers/date'
import AppIcon from 'components/UI/AppIcon'
import i18n from './i18n'

interface OfflineProps {
  status: string
  device: string
  locale: Locale
}

export default function Offline({ status, device, locale }: OfflineProps) {
  const { visit } = i18n[locale]
  const name = device === 'mobile' ? 'phone_iphone' : 'computer'
  const distance = getDistance(status, locale)

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      {`${visit} ${distance}`}
      <AppIcon name={name} sx={{ fontSize: '0.75rem!important' }} />
    </Box>
  )
}
