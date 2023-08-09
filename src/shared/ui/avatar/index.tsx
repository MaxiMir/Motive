import { Button, ButtonProps } from '@mui/material'
import { ElementType } from 'react'
import dynamic from 'next/dynamic'

const Plug = dynamic(() => import('./plug'))
const TunedAvatar = dynamic(() => import('./tunedAvatar'))

interface AvatarProps {
  name: string
  src?: string | null
  size: number
  buttonProps?: Omit<ButtonProps, 'sx'> & { component?: ElementType }
}

function Avatar({ src, name, size, buttonProps }: AvatarProps) {
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
      {!src ? <Plug name={name} size={size} /> : <TunedAvatar src={src} size={size} />}
    </Button>
  )
}

export default Avatar
