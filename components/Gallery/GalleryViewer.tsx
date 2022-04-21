import { MouseEvent, useCallback, useState } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { PhotoDto } from 'dto'
import GallerySimple from './GallerySimple'
import { getPhotosWithSource } from './helper'

export interface GalleryViewerProps {
  photos: PhotoDto[]
  animation?: boolean
}

export default function GalleryViewer({ photos, animation }: GalleryViewerProps): JSX.Element {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)
  const photosWithSource = getPhotosWithSource(photos)

  const openViewer = useCallback((_: MouseEvent, { index }: { index: number }) => {
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
            <Carousel currentIndex={currentImage} views={photosWithSource.map((p) => ({ ...p, source: p.src }))} />
          </Modal>
        )}
      </ModalGateway>
      <GallerySimple photos={photosWithSource} animation={animation} onClick={openViewer} />
    </>
  )
}
