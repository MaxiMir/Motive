import { useCallback } from 'react'
import dynamic from 'next/dynamic'
import { PhotoClickHandler } from 'react-photo-gallery'
import { PhotoWithSourceDto } from 'dto'
import GallerySlide from './components/GallerySlide'

const Gallery = dynamic(() => import('react-photo-gallery'), { ssr: false })

interface SimpleGalleryProps {
  photos: PhotoWithSourceDto[]
  animation?: boolean
  onClick?: PhotoClickHandler
}

export default function SimpleGallery({ photos, animation, onClick }: SimpleGalleryProps): JSX.Element {
  const renderImage = useCallback((props) => <GallerySlide {...props} animation={animation} />, [animation])

  return <Gallery photos={photos} renderImage={renderImage} onClick={onClick} />
}
