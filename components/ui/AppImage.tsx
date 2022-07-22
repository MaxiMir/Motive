import Image, { ImageProps } from 'next/image'
import { getImageUrl } from 'helpers/url'

export default function AppImage({ src, ...props }: ImageProps) {
  const srcFull = getImageUrl(src)

  return <Image src={srcFull} {...props} />
}
