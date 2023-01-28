import { Button, ButtonProps } from '@mui/material'
import dynamic from 'next/dynamic'
import { Device } from 'shared/api'

const StatusHub = dynamic(() => import('./statusHub'))
const Plug = dynamic(() => import('./plug'))

interface AvatarStatusProps {
  name: string
  src?: string | null
  online?: boolean | null
  lastSeen?: string | null
  device?: Device | null
  size: number
  buttonProps?: Omit<ButtonProps, 'sx'>
}

function AvatarStatus({
  src,
  name,
  size,
  online,
  lastSeen,
  device,
  buttonProps,
}: AvatarStatusProps) {
  return (
    <Button
      sx={{
        minWidth: size,
        padding: '3px',
        borderRadius: '50%',
      }}
      {...buttonProps}
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
