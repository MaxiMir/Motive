import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Badge, Box, Tooltip } from '@mui/material'
import useFormatDistance from '@hooks/useFormatDistance'
import { Device } from '@helpers/navigator'
import { useMessages } from './hooks/useMessages'
import { getShortDistance } from './helper'

const DeviceIcon = dynamic(() => import('./components/DeviceIcon'))

interface OfflineProps {
  lastSeen: string
  device?: Device | null
  children: ReactNode
}

function Offline({ lastSeen, device, children }: OfflineProps) {
  const messages = useMessages()
  const formatDistance = useFormatDistance()
  const distance = formatDistance(lastSeen)
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
              {messages.seenText} {distance}
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
          fontSize: '10px',
        },
      }}
    >
      {children}
    </Badge>
  )
}

export default Offline
