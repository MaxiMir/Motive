import { Stack } from '@mui/material'
import { styled } from '@mui/system'
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
    <StyledStack direction="row" alignItems="center" gap={0.5}>
      {device && <DeviceIcon device={device} />}
      {seenText} {distance}
    </StyledStack>
  )
}

const StyledStack = styled(Stack)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.grey[400],
}))

export default Offline
