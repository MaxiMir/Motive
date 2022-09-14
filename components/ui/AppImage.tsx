import Image, { ImageProps } from 'next/image'
import { getImageUrl } from 'helpers/url'

interface AppImageProps extends Omit<ImageProps, 'src'> {
  src: string
}

export default function AppImage({ src, ...props }: AppImageProps) {
  const absoluteSrc = getImageUrl(src)

  return <Image src={absoluteSrc} {...props} />
}
