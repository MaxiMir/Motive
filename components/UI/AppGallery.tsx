import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { PhotoDto } from 'dto'
import { getImageUrl } from 'helpers/url'
import AppGalleryPhoto from './AppGalleryPhoto'

const Gallery = dynamic(() => import('react-photo-gallery'), { ssr: false })

interface AppGalleryProps {
  items: PhotoDto[]
}

export default function AppGallery({ items }: AppGalleryProps): JSX.Element {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)
  const photos = getPhotos()

  const openLightbox = useCallback((_, { index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const renderImage = useCallback((props) => <AppGalleryPhoto {...props} />, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  function getPhotos() {
    return items.map((item) => {
      const imageUrl = getImageUrl(item.src)

      return { ...item, src: imageUrl, source: imageUrl }
    })
  }

  return (
    <>
      <Gallery photos={photos} renderImage={renderImage} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen && (
          <Modal onClose={closeLightbox}>
            <Carousel currentIndex={currentImage} views={photos} />
          </Modal>
        )}
      </ModalGateway>
    </>
  )
}
