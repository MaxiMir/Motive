import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { Device } from '@helpers/window'

const StatusHub = dynamic(() => import('./components/StatusHub'))
const Plug = dynamic(() => import('./components/Plug'))

interface AvatarStatusProps {
  src?: string | null
  name: string
  online?: boolean | null
  lastSeen?: string | null
  device?: Device | null
  size: number
}

export default function AvatarStatus({ src, name, size, online, lastSeen, device }: AvatarStatusProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignSelf="flex-start"
      sx={{
        img: {
          pointerEvents: 'none',
        },
      }}
    >
      {!src ? (
        <Plug name={name} size={size} />
      ) : (
        <StatusHub src={src} size={size} online={online} lastSeen={lastSeen} device={device} />
      )}
    </Box>
  )
}
