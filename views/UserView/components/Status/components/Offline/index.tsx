import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { Locale } from 'hooks/useLocale'
import { getDistance } from 'helpers/date'
import { Device } from 'helpers/dom'
import i18n from './i18n'

const DeviceIcon = dynamic(() => import('./components/DeviceIcon'))

interface OfflineProps {
  lastSeen: string
  device?: Device | null
  locale: Locale
}

export default function Offline({ lastSeen, device, locale }: OfflineProps) {
  const { visit } = i18n[locale]
  const distance = getDistance(lastSeen, locale)

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      {`${visit} ${distance}`}
      {device && <DeviceIcon device={device} />}
    </Box>
  )
}
