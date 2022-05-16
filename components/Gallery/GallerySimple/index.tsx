import PhotoAlbum from 'react-photo-album'
import { PhotoDto } from 'dto'
import { getPhotosWithSource } from '../helper'
import GalleryPhoto from './components/GalleryPhoto'

export interface GallerySimpleProps {
  photos: PhotoDto[]
  onClick?: (index: number) => void
}

export default function GallerySimple({ photos, onClick }: GallerySimpleProps) {
  const photosWithSource = getPhotosWithSource(photos)

  return (
    <PhotoAlbum
      layout="columns"
      photos={photosWithSource}
      renderPhoto={(props) => <GalleryPhoto {...props} onClick={onClick} />}
    />
  )
}
