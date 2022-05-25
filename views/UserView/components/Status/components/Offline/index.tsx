import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { Locale } from 'hooks/useLocale'
import { getDistance } from 'helpers/date'
import i18n from './i18n'

const AppIcon = dynamic(() => import('components/UI/AppIcon'))

interface OfflineProps {
  lastSeen: string
  device?: string | null
  locale: Locale
}

export default function Offline({ lastSeen, device, locale }: OfflineProps) {
  const { visit } = i18n[locale]
  const distance = getDistance(lastSeen, locale)

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      {`${visit} ${distance}`}
      {device && (
        <AppIcon name={device === 'mobile' ? 'phone_iphone' : 'computer'} sx={{ fontSize: '0.75rem!important' }} />
      )}
    </Box>
  )
}
