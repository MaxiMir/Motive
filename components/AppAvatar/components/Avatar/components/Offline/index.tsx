import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Badge, Box } from '@mui/material'
import useLocale from 'hooks/useLocale'
import { getDistance } from 'helpers/date'
import { Device } from 'helpers/dom'

const DeviceIcon = dynamic(() => import('./components/DeviceIcon'))

interface OfflineProps {
  lastSeen: string
  device?: Device | null
  children: ReactNode
}

export default function Offline({ lastSeen, device, children }: OfflineProps) {
  const { locale } = useLocale()
  const distance = getDistance(lastSeen, locale)

  return (
    <Badge
      overlap="circular"
      variant="dot"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <Box display="flex" alignItems="center" gap={0.5}>
          {distance}
          {device && <DeviceIcon device={device} />}
        </Box>
      }
    >
      {children}
    </Badge>
  )
}
