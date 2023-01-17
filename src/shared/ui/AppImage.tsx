import Image, { ImageProps } from 'next/image'
import { getImageSrc } from '@href'

interface AppImageProps extends Omit<ImageProps, 'src'> {
  src: string
}

function AppImage({ src, alt, ...props }: AppImageProps) {
  const absoluteSrc = getImageSrc(src)

  return <Image src={absoluteSrc} alt={alt} draggable={false} {...props} />
}

export default AppImage
