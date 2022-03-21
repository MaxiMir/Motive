import Image, { ImageProps } from 'next/image'
import { getImageUrl } from 'helpers/url'

export default function AppImage({ src, ...props }: ImageProps): JSX.Element {
  const srcFull = typeof src !== 'string' || src.includes('https://') ? src : getImageUrl(src)

  return <Image src={srcFull} {...props} />
}
