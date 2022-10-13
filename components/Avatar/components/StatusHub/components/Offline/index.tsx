import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Badge, Box, Tooltip } from '@mui/material'
import i18nCommon from 'constants/i18n'
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
  const distance = getDistance(lastSeen, locale, false)
  const { agoText } = i18nCommon[locale]

  return (
    <Badge
      overlap="circular"
      color="secondary"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <Tooltip
          title={
            <Box display="flex" alignItems="center" gap={0.5}>
              {distance} {agoText}
              {device && <DeviceIcon device={device} />}
            </Box>
          }
        >
          <span>{distance}</span>
        </Tooltip>
      }
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: 'gray',
          color: 'white',
          fontSize: '0.625rem',
          right: {
            xs: '15%',
            md: '22%',
          },
        },
      }}
    >
      {children}
    </Badge>
  )
}