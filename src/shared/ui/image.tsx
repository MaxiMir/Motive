import NextImage, { ImageProps as MuiImageProps } from 'next/image'
import { getStaticSrc } from 'shared/lib/helpers'

interface ImageProps extends Omit<MuiImageProps, 'src'> {
  src: string
}

function Image({ src, alt, ...props }: ImageProps) {
  const staticSrc = getStaticSrc(src)

  return <NextImage src={staticSrc} alt={alt} draggable={false} {...props} />
}

export default Image
