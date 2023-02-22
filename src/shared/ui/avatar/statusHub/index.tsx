import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Device } from 'shared/api'

const Online = dynamic(() => import('./online'))
const Offline = dynamic(() => import('./offline'))

interface StatusHubProps {
  online?: boolean | null
  lastSeen?: string | null
  device?: Device | null
  children: ReactNode
}

export function StatusHub({ online, lastSeen, device, children }: StatusHubProps) {
  if (online) {
    return <Online>{children}</Online>
  }

  if (lastSeen) {
    return (
      <Offline lastSeen={lastSeen} device={device}>
        {children}
      </Offline>
    )
  }

  return <>{children}</>
}
