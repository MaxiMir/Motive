import { Avatar } from '@mui/material'
import { getImageUrl } from 'src/common/helpers/url'

interface ContentProps {
  src: string
  size: number
}

export default function Content({ src, size }: ContentProps) {
  const imageUrl = getImageUrl(src)

  return <Avatar src={imageUrl} sx={{ width: size, height: size }} />
}
