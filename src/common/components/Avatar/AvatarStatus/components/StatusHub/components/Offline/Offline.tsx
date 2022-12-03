import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Badge, Box, Tooltip } from '@mui/material'
import useDateDistance from '@hooks/useDateDistance'
import { Device } from '@helpers/window'
import { getShortDistance } from './helper'
import useMessages from './hooks/useMessages'

const DeviceIcon = dynamic(() => import('./components/DeviceIcon'))

interface OfflineProps {
  lastSeen: string
  device?: Device | null
  children: ReactNode
}

function Offline({ lastSeen, device, children }: OfflineProps) {
  const messages = useMessages()
  const getDateDistance = useDateDistance()
  const distance = getDateDistance(lastSeen)
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
              {messages.seenText} {distance} {messages.agoText}
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
        },
      }}
    >
      {children}
    </Badge>
  )
}

export default Offline
