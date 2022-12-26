import { useCallback } from 'react'
import PhotoAlbum, { PhotoProps } from 'react-photo-album'
import { PhotoDto } from '@features/feedback'
import GalleryPhoto from './components/GalleryPhoto/GalleryPhoto'

interface GallerySimpleProps {
  photos: PhotoDto[]
  onClick: (index: number) => void
}

function GallerySimple({ photos, onClick }: GallerySimpleProps) {
  const renderPhoto = useCallback(
    (props: PhotoProps) => <GalleryPhoto {...props} onClick={onClick} />,
    [onClick],
  )

  return <PhotoAlbum layout="columns" photos={photos} renderPhoto={renderPhoto} />
}

export default GallerySimple
