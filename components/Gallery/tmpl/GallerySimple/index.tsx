import { useCallback } from 'react'
import dynamic from 'next/dynamic'
import { PhotoClickHandler } from 'react-photo-gallery'
import { PhotoDto } from 'dto'
import GallerySlide from './components/GallerySlide'

const Gallery = dynamic(() => import('react-photo-gallery'), { ssr: false })

export interface GallerySimpleProps {
  tmpl: 'simple'
  photos: PhotoDto[]
  animation?: boolean
  onClick?: PhotoClickHandler
}

export default function GallerySimple({ photos, animation, onClick }: GallerySimpleProps): JSX.Element {
  const renderImage = useCallback((props) => <GallerySlide {...props} animation={animation} />, [animation])

  return <Gallery photos={photos} renderImage={renderImage} onClick={onClick} />
}
