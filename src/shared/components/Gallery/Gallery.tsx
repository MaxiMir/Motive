import { useState } from 'react'
import dynamic from 'next/dynamic'
import PhotoAlbum, { ClickHandlerProps } from 'react-photo-album'
import { PhotoDto } from '@features/feedback'
import GalleryPhoto from './components/GalleryPhoto'

const AppLightBox = dynamic(() => import('@ui/AppLightBox'))

export interface GalleryViewerProps {
  photos: PhotoDto[]
}

function Gallery({ photos }: GalleryViewerProps) {
  const [index, setIndex] = useState<number>()
  const sources = photos.map((p) => p.src)
  const open = typeof index === 'number'

  const onClick = (props: ClickHandlerProps) => setIndex(props.index)

  const onClose = () => setIndex(undefined)

  return (
    <>
      {open && <AppLightBox sources={sources} index={index} onClose={onClose} />}
      <PhotoAlbum layout="rows" photos={photos} renderPhoto={GalleryPhoto} onClick={onClick} />
    </>
  )
}

export default Gallery
