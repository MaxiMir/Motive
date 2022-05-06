import { useCallback } from 'react'
import dynamic from 'next/dynamic'
import { PhotoClickHandler, RenderImageProps } from 'react-photo-gallery'
import { PhotoDto } from 'dto'
import GallerySlide from './components/GallerySlide'
import { getPhotosWithSource } from '../helper'

const Gallery = dynamic(() => import('react-photo-gallery'), { ssr: false })

export interface GallerySimpleProps {
  photos: PhotoDto[]
  onClick?: PhotoClickHandler
}

export default function GallerySimple({ photos, onClick }: GallerySimpleProps) {
  const photosWithSource = getPhotosWithSource(photos)

  const renderImage = useCallback((props: RenderImageProps) => <GallerySlide {...props} />, [])

  return <Gallery photos={photosWithSource} renderImage={renderImage} onClick={onClick} />
}
