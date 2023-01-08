import { useState } from 'react'
import PhotoAlbum, { ClickHandlerProps } from 'react-photo-album'
import { PhotoDto } from '@features/feedback'
import AppLightBox from '@ui/AppLightBox'
import GalleryPhoto from './components/GalleryPhoto'

export interface GalleryViewerProps {
  photos: PhotoDto[]
}

function Gallery({ photos }: GalleryViewerProps) {
  const [index, setIndex] = useState<number>()
  const sources = photos.map(({ src }) => src)

  const onClick = (props: ClickHandlerProps) => {
    setIndex(props.index)
  }

  return (
    <>
      <AppLightBox sources={sources} index={index} setIndex={setIndex} />
      <PhotoAlbum layout="rows" photos={photos} renderPhoto={GalleryPhoto} onClick={onClick} />
    </>
  )
}

export default Gallery
