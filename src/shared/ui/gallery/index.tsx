import { useState } from 'react'
import { ClickHandlerProps } from 'react-photo-album'
import dynamic from 'next/dynamic'
import { PhotoDto } from 'shared/api'
import { GalleryPhoto } from './gallery-photo'

const PhotoAlbum = dynamic(() => import('react-photo-album'), { ssr: false })
const LightBox = dynamic(() => import('shared/ui/light-box'))

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
