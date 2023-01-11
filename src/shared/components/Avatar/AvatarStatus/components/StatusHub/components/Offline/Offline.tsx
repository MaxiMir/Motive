import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Badge, Box } from '@mui/material'
import useFormatDistance from '@hooks/useFormatDistance'
import { Device } from '@features/device'
import TooltipArrow from '@ui/styled/TooltipArrow'
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
        <TooltipArrow
          title={
            <Box
              display="flex"
              alignItems="center"
              gap={0.5}
              sx={{
                '& span': {
                  fontSize: 12,
                },
              }}
            >
              {device && <DeviceIcon device={device} />}
              {messages.seenText} {distance}
            </Box>
          }
        >
          <>{shortDistance}</>
        </TooltipArrow>
      }
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: 'gray',
          color: 'common.white',
          fontSize: 10,
        },
      }}
    >
      {children}
    </Badge>
  )
}

export default Offline
