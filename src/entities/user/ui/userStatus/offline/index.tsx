import { Stack } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { Device } from 'shared/api'
import { useFormatDistance } from 'shared/lib/hooks'

const DeviceIcon = dynamic(() => import('./deviceIcon'))

interface OfflineProps {
  lastSeen: string
  device?: Device | null
}

function Offline({ lastSeen, device }: OfflineProps) {
  const { formatMessage } = useIntl()
  const seenText = formatMessage({ id: 'common.seen' })
  const formatDistance = useFormatDistance()
  const distance = formatDistance(lastSeen)

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={0.5}
      fontSize={12}
      sx={(theme) => ({
        color: theme.palette.grey[400],
        '& span': {
          fontSize: 12,
        },
      })}
    >
      {device && <DeviceIcon device={device} />}
      {seenText} {distance}
    </Stack>
  )
}

export default Offline
