import { useCallback } from 'react'
import PhotoAlbum, { PhotoProps } from 'react-photo-album'
import { PhotoDto } from '@dto'
import GalleryPhoto from './components/GalleryPhoto'

interface GallerySimpleProps {
  photos: PhotoDto[]
  onClick?: (index: number) => void
}

function GallerySimple({ photos, onClick }: GallerySimpleProps) {
  const renderPhoto = useCallback((props: PhotoProps) => <GalleryPhoto {...props} onClick={onClick} />, [onClick])

  return <PhotoAlbum layout="columns" photos={photos} renderPhoto={renderPhoto} />
}

export default GallerySimple
