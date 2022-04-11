import { useCallback, useState } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { PhotoDto } from 'dto'
import GallerySimple from './GallerySimple'

export interface GalleryViewerProps {
  tmpl: 'viewer'
  photos: PhotoDto[]
  animation?: boolean
}

export default function Index({ photos, animation }: GalleryViewerProps): JSX.Element {
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
            <Carousel currentIndex={currentImage} views={photos.map((p) => ({ ...p, source: p.src }))} />
          </Modal>
        )}
      </ModalGateway>
      <GallerySimple tmpl="simple" photos={photos} animation={animation} onClick={openViewer} />
    </>
  )
}
