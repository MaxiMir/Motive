import { useCallback } from 'react'
import Gallery, { PhotoClickHandler, RenderImageProps } from 'react-photo-gallery'
import { PhotoDto } from 'dto'
import GallerySlide from './components/GallerySlide'
import { getPhotosWithSource } from '../helper'

export interface GallerySimpleProps {
  photos: PhotoDto[]
  onClick?: PhotoClickHandler
}

export default function GallerySimple({ photos, onClick }: GallerySimpleProps) {
  const photosWithSource = getPhotosWithSource(photos)
  const compactSingle = photos.length === 1 && photos[0].width < photos[0].height

  const renderImage = useCallback((props: RenderImageProps) => <GallerySlide {...props} />, [])

  return (
    <Gallery
      direction={compactSingle ? 'column' : undefined}
      columns={compactSingle ? 2 : undefined}
      photos={photosWithSource}
      renderImage={renderImage}
      onClick={onClick}
    />
  )
}
