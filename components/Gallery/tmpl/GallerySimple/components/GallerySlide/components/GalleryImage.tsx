import Image from 'next/image'
import { RenderImageProps } from 'react-photo-gallery'

export default function GalleryImage({ photo, index, onClick }: RenderImageProps): JSX.Element {
  return (
    <Image
      src={photo.src}
      width={photo.width}
      height={photo.height}
      alt=""
      onClick={(event) => onClick?.(event, { index })}
    />
  )
}
