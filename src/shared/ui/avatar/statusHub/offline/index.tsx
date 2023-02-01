import { Badge, Stack } from '@mui/material'
import { ReactNode } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { Device } from 'shared/api'
import { useFormatDistance } from 'shared/lib/hooks'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { getShortDistance } from './lib'

const DeviceIcon = dynamic(() => import('shared/ui/deviceIcon'))

interface OfflineProps {
  lastSeen: string
  device?: Device | null
  children: ReactNode
}

function Offline({ lastSeen, device, children }: OfflineProps) {
  const { formatMessage } = useIntl()
  const seenText = formatMessage({ id: 'common.seen' })
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
              gap={0.5}
              sx={{
                '& span': {
                  fontSize: 12,
                },
              }}
            >
              {device && <DeviceIcon device={device} />}
              {seenText} {distance}
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
