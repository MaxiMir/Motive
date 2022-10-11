import { Avatar } from '@mui/material'
import { getImageUrl } from 'helpers/url'

interface AvatarProps {
  src: string
  size: number
}

export default function Content({ src, size }: AvatarProps) {
  const imageUrl = getImageUrl(src)

  return <Avatar src={imageUrl} sx={{ width: size, height: size }} />
}
