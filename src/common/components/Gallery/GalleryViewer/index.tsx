import { FC, ReactNode, useCallback, useState } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { PhotoDto } from '@dto'
import GallerySimple from '../GallerySimple'
import { getPhotosWithSource } from './helper'

export interface GalleryViewerProps {
  photos: PhotoDto[]
}

export default function GalleryViewer({ photos }: GalleryViewerProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)
  const photosWithSource = getPhotosWithSource(photos)
  const views = photosWithSource.map((p) => ({ ...p, source: p.src }))
  const GalleryGateway = ModalGateway as FC<{ children: ReactNode }>

  const openViewer = useCallback((index: number) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeViewer = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  return (
    <>
      <GalleryGateway>
        {viewerIsOpen && (
          <Modal onClose={closeViewer}>
            <Carousel currentIndex={currentImage} views={views} />
          </Modal>
        )}
      </GalleryGateway>
      <GallerySimple photos={photos} onClick={openViewer} />
    </>
  )
}
