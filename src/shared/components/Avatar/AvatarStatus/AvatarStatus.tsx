import { MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import { Device } from '@helpers/navigator'

const StatusHub = dynamic(() => import('./components/StatusHub'))
const Plug = dynamic(() => import('./components/Plug/Plug'))

interface AvatarStatusProps {
  src?: string | null
  name: string
  online?: boolean | null
  lastSeen?: string | null
  device?: Device | null
  disabled?: boolean
  size: number
  onClick?: (e: MouseEvent<HTMLElement>) => void
}

function AvatarStatus({ src, name, size, online, lastSeen, device, disabled, onClick }: AvatarStatusProps) {
  return (
    <Button
      sx={{ minWidth: 'initial', padding: '3px', borderRadius: '50%', textTransform: 'none' }}
      disabled={disabled}
      onClick={onClick}
    >
      {!src ? (
        <Plug name={name} size={size} />
      ) : (
        <StatusHub src={src} size={size} online={online} lastSeen={lastSeen} device={device} />
      )}
    </Button>
  )
}

export default AvatarStatus
