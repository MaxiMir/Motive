import Image, { ImageProps } from 'next/image'
import { getImageSrc } from '@href'

type AppImageProps = Omit<ImageProps, 'src'> & {
  src: string
}

export default function AppImage({ src, ...props }: AppImageProps) {
  const absoluteSrc = getImageSrc(src)

  return <Image src={absoluteSrc} {...props} />
}
