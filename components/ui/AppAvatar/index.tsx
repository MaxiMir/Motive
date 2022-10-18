import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { Device } from 'helpers/dom'

const StatusHub = dynamic(() => import('./components/StatusHub'))
const Plug = dynamic(() => import('./components/Plug'))

export interface AppAvatarProps {
  src?: string | null
  name: string
  online?: boolean | null
  lastSeen?: string | null
  device?: Device | null
  size: number
}

export default function AppAvatar({ src, name, size, online, lastSeen, device }: AppAvatarProps) {
  return (
    <Box display="flex" justifyContent="center">
      {!src ? (
        <Plug name={name} size={size} />
      ) : (
        <StatusHub src={src} size={size} online={online} lastSeen={lastSeen} device={device} />
      )}
    </Box>
  )
}
