import dynamic from 'next/dynamic'
import { Device } from 'shared/api'
import { TunedAvatar } from './tunedAvatar'

const Online = dynamic(() => import('./online'))
const Offline = dynamic(() => import('./offline'))

interface StatusHubProps {
  src: string
  online?: boolean | null
  lastSeen?: string | null
  device?: Device | null
  size: number
}

function StatusHub({ src, size, online, lastSeen, device }: StatusHubProps) {
  if (online) {
    return (
      <Online>
        <TunedAvatar src={src} size={size} />
      </Online>
    )
  }

  if (lastSeen) {
    return (
      <Offline lastSeen={lastSeen} device={device}>
        <TunedAvatar src={src} size={size} />
      </Offline>
    )
  }

  return <TunedAvatar src={src} size={size} />
}

export default StatusHub
