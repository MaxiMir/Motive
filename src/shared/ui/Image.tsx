import NextImage, { ImageProps as MuiImageProps } from 'next/image'
import { getImageSrc } from '@href'

interface ImageProps extends Omit<MuiImageProps, 'src'> {
  src: string
}

function Image({ src, alt, ...props }: ImageProps) {
  const absoluteSrc = getImageSrc(src)

  return <NextImage src={absoluteSrc} alt={alt} draggable={false} {...props} />
}

export default Image
