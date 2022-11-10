import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Badge, Box, Tooltip } from '@mui/material'
import { getDistance } from '@utils/date'
import { Device } from '@helpers/dom'
import { getShortDistance } from './helper'

const DeviceIcon = dynamic(() => import('./components/DeviceIcon'))

interface OfflineProps {
  lastSeen: string
  device?: Device | null
  children: ReactNode
}

export default function Offline({ lastSeen, device, children }: OfflineProps) {
  const { locale, formatMessage } = useIntl()
  const distance = getDistance(lastSeen, locale)
  const agoText = formatMessage({ id: 'common.ago' })
  const seenText = formatMessage({ id: 'common.seen' })
  const shortDistance = getShortDistance(distance)

  return (
    <Badge
      overlap="circular"
      color="secondary"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <Tooltip
          title={
            <Box display="flex" alignItems="center" gap={0.5}>
              {device && <DeviceIcon device={device} />}
              {seenText} {distance} {agoText}
            </Box>
          }
        >
          <span>{shortDistance}</span>
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