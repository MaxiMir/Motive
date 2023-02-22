import { Button, ButtonProps } from '@mui/material'
import { ElementType } from 'react'
import dynamic from 'next/dynamic'
import { Device } from 'shared/api'
import { StatusHub } from './statusHub'

const Plug = dynamic(() => import('./plug'))
const TunedAvatar = dynamic(() => import('./tunedAvatar'))

interface AvatarProps {
  name: string
  src?: string | null
  online?: boolean | null
  lastSeen?: string | null
  device?: Device | null
  size: number
  buttonProps?: Omit<ButtonProps, 'sx'> & { component?: ElementType }
}

function Avatar({ src, name, size, online, lastSeen, device, buttonProps }: AvatarProps) {
  return (
    <StatusHub online={online} lastSeen={lastSeen} device={device}>
      <Button
        sx={{
          minWidth: size,
          padding: '3px',
          borderRadius: '50%',
        }}
        component="span"
        {...buttonProps}
      >
        {!src ? <Plug name={name} size={size} /> : <TunedAvatar src={src} size={size} />}
      </Button>
    </StatusHub>
  )
}

export default Avatar
