import { useCallback, useState } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { PhotoWithSourceDto } from 'dto'
import SimpleGallery from './SimpleGallery'

interface GalleryViewerProps {
  photos: PhotoWithSourceDto[]
  animation?: boolean
}

export default function GalleryViewer({ photos, animation }: GalleryViewerProps): JSX.Element {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openViewer = useCallback((_, { index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeViewer = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  return (
    <>
      <ModalGateway>
        {viewerIsOpen && (
          <Modal onClose={closeViewer}>
            <Carousel currentIndex={currentImage} views={photos} />
          </Modal>
        )}
      </ModalGateway>
      <SimpleGallery photos={photos} animation={animation} onClick={openViewer} />
    </>
  )
}
