import { Avatar } from '@mui/material'
import { getStaticSrc } from 'shared/lib/helpers'

interface TunedAvatarProps {
  src: string
  size: number
}

function TunedAvatar({ src, size }: TunedAvatarProps) {
  const staticSrc = getStaticSrc(src)

  return (
    <Avatar
      src={staticSrc}
      alt=""
      draggable={false}
      sx={{
        width: size,
        height: size,
        pointerEvents: 'none',
      }}
    />
  )
}

export default TunedAvatar
