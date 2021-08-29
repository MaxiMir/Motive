import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { Photo } from 'dto'
import AppGalleryPhoto from './AppGalleryPhoto'

const Gallery = dynamic(() => import('react-photo-gallery'), { ssr: false })

interface AppGalleryProps {
  items: Photo[]
}

export default function AppGallery({ items }: AppGalleryProps): JSX.Element {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((_, { index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const renderImage = useCallback((props) => <AppGalleryPhoto {...props} />, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  return (
    <>
      <Gallery photos={items} renderImage={renderImage} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen && (
          <Modal onClose={closeLightbox}>
            <Carousel currentIndex={currentImage} views={items.map((p) => ({ ...p, source: p.src }))} />
          </Modal>
        )}
      </ModalGateway>
    </>
  )
}
