import { useState } from 'react'
import dynamic from 'next/dynamic'
import PhotoAlbum, { ClickHandlerProps } from 'react-photo-album'
import { PhotoDto } from '@entities/feedback'
import GalleryPhoto from './components/GalleryPhoto'

const LightBox = dynamic(() => import('@ui/LightBox'))

export interface GalleryProps {
  photos: PhotoDto[]
}

function Gallery({ photos }: GalleryProps) {
  const [index, setIndex] = useState<number>()
  const sources = photos.map((p) => p.src)
  const open = typeof index === 'number'

  const onClick = (props: ClickHandlerProps) => setIndex(props.index)

  const onClose = () => setIndex(undefined)

  return (
    <>
      {open && <LightBox sources={sources} index={index} onClose={onClose} />}
      <PhotoAlbum layout="rows" photos={photos} renderPhoto={GalleryPhoto} onClick={onClick} />
    </>
  )
}

export default Gallery
