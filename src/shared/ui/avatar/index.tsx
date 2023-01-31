import { Button, ButtonProps } from '@mui/material'
import { ElementType } from 'react'
import dynamic from 'next/dynamic'
import { Device } from 'shared/api'

const StatusHub = dynamic(() => import('./statusHub'))
const Plug = dynamic(() => import('./plug'))

interface AvatarProps {
  name: string
  src?: string | null
  online?: boolean | null
  lastSeen?: string | null
  device?: Device | null
  size: number
  buttonProps?: {
    component: ElementType
    onClick?: ButtonProps['onClick']
  }
}

function Avatar({ src, name, size, online, lastSeen, device, buttonProps }: AvatarProps) {
  return (
    <Button
      sx={{
        minWidth: size,
        padding: '3px',
        borderRadius: '50%',
      }}
      component="span"
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

export default Avatar
