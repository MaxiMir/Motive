import dynamic from 'next/dynamic'
import { PhotoDto } from 'dto'
import SimpleGallery from './components/SimpleGallery'
import { getPhotosWithSource } from './helper'

const GalleryViewer = dynamic(() => import('./components/GalleryViewer'))

interface GalleryProps {
  photos: PhotoDto[]
  viewer?: boolean
  animation?: boolean
}

export default function Gallery({ photos, viewer, animation }: GalleryProps): JSX.Element {
  const photosWithSource = getPhotosWithSource(photos)

  return (
    <>
      {!viewer ? (
        <SimpleGallery photos={photosWithSource} animation={animation} />
      ) : (
        <GalleryViewer photos={photosWithSource} animation={animation} />
      )}
    </>
  )
}
