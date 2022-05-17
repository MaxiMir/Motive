import { useCallback } from 'react'
import PhotoAlbum, { PhotoProps } from 'react-photo-album'
import { PhotoDto } from 'dto'
import { getPhotosWithSource } from '../helper'
import GalleryPhoto from './components/GalleryPhoto'

export interface GallerySimpleProps {
  photos: PhotoDto[]
  onClick?: (index: number) => void
}

export default function GallerySimple({ photos, onClick }: GallerySimpleProps) {
  const photosWithSource = getPhotosWithSource(photos)

  const renderPhoto = useCallback((props: PhotoProps) => <GalleryPhoto {...props} onClick={onClick} />, [onClick])

  return <PhotoAlbum layout="columns" photos={photosWithSource} renderPhoto={renderPhoto} />
}
