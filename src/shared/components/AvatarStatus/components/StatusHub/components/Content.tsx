import { Avatar } from '@mui/material'
import { getImageSrc } from '@helpers/url'

interface ContentProps {
  src: string
  size: number
}

function Content({ src, size }: ContentProps) {
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

export default Content
