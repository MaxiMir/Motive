import dynamic from 'next/dynamic'
import { Box } from '@mui/material'

const Avatar = dynamic(() => import('./components/Avatar'))
const NoAvatar = dynamic(() => import('./components/NoAvatar'))

export interface UserAvatarProps {
  src?: string | null
  name: string
  online?: boolean | null
  size: number
}

export default function AppAvatar({ src, name, size, online }: UserAvatarProps) {
  return (
    <Box display="flex" justifyContent="center">
      {!src ? <NoAvatar name={name} size={size} /> : <Avatar src={src} size={size} online={online} />}
    </Box>
  )
}
