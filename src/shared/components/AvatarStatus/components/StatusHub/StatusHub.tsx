import dynamic from 'next/dynamic'
import { Device } from '@entities/device'
import Content from './components/Content'

const Online = dynamic(() => import('./components/Online'))
const Offline = dynamic(() => import('./components/Offline'))

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
        <Content src={src} size={size} />
      </Online>
    )
  }

  if (lastSeen) {
    return (
      <Offline lastSeen={lastSeen} device={device}>
        <Content src={src} size={size} />
      </Offline>
    )
  }

  return <Content src={src} size={size} />
}

export default StatusHub
