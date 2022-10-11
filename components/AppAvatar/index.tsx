import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { Device } from 'helpers/dom'

const Avatar = dynamic(() => import('./components/Avatar'))
const NoAvatar = dynamic(() => import('./components/NoAvatar'))

export interface UserAvatarProps {
  src?: string | null
  name: string
  online?: boolean | null
  lastSeen?: string | null
  device?: Device | null
  size: number
}

export default function AppAvatar({ src, name, size, online, lastSeen, device }: UserAvatarProps) {
  return (
    <Box display="flex" justifyContent="center">
      {!src ? (
        <NoAvatar name={name} size={size} />
      ) : (
        <Avatar src={src} size={size} online={online} lastSeen={lastSeen} device={device} />
      )}
    </Box>
  )
}
