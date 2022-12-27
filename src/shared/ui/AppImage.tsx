// TODO REMOVE LEGACY
import Image, { ImageProps } from 'next/legacy/image'
import { getImageSrc } from '@href'

interface AppImageProps extends Omit<ImageProps, 'src'> {
  src: string
}

function AppImage({ src, alt, ...props }: AppImageProps) {
  const absoluteSrc = getImageSrc(src)

  return <Image src={absoluteSrc} alt={alt} {...props} />
}

export default AppImage
