import { Badge, Stack } from '@mui/material'
import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Device } from '@shared/api/device'
import { useFormatDistance } from '@shared/lib/hooks'
import TooltipArrow from '@shared/ui/styled/TooltipArrow'
import { getShortDistance } from './lib/helpers/content'
import { useMessages } from './lib/hooks/useMessages'

const DeviceIcon = dynamic(() => import('./ui/deviceIcon/DeviceIcon'))

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
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              sx={{
                '& span': {
                  fontSize: 12,
                },
              }}
            >
              {device && <DeviceIcon device={device} />}
              {messages.seenText} {distance}
            </Stack>
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