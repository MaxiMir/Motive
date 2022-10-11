import dynamic from 'next/dynamic'
import { Device } from 'helpers/dom'
import Content from './components/Content'

const Online = dynamic(() => import('./components/Online'))
const Offline = dynamic(() => import('./components/Offline'))

interface AvatarProps {
  src: string
  online?: boolean | null
  lastSeen: string
  device?: Device | null
  size: number
}

export default function Avatar({ src, size, online, lastSeen, device }: AvatarProps) {
  if (online) {
    return (
      <Online size={size}>
        <Content src={src} size={size} />
      </Online>
    )
  }

  if (!lastSeen) {
    return <Content src={src} size={size} />
  }

  return (
    <Offline lastSeen={lastSeen} device={device}>
      <Content src={src} size={size} />
    </Offline>
  )
}
