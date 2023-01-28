import { Avatar } from '@mui/material'
import { getImageSrc } from 'shared/lib/helpers'

interface ContentProps {
  src: string
  size: number
}

export function TunedAvatar({ src, size }: ContentProps) {
  const imageSrc = getImageSrc(src)

  return (
    <Avatar
      src={imageSrc}
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
