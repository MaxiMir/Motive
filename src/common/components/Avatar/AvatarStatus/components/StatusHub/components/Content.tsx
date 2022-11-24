import { Avatar } from '@mui/material'
import { getImageSrc } from '@href'

interface ContentProps {
  src: string
  size: number
}

export default function Content({ src, size }: ContentProps) {
  const imageSrc = getImageSrc(src)

  return <Avatar src={imageSrc} draggable={false} sx={{ width: size, height: size, pointerEvents: 'none' }} />
}
