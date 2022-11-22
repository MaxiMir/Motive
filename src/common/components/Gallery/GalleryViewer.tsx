import { useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-image-lightbox/style.css'
import { PhotoDto } from '@dto'
import { getImageSrc } from '@href'
import GallerySimple from './GallerySimple'

const Lightbox = dynamic(() => import('react-image-lightbox'))

export interface GalleryViewerProps {
  photos: PhotoDto[]
}

export default function GalleryViewer({ photos }: GalleryViewerProps) {
  const [index, setIndex] = useState<number>()
  const sources = photos.map(({ src }) => getImageSrc(src))
  const open = typeof index === 'number'
  const count = sources.length

  const onCloseRequest = () => setIndex(undefined)

  const onMovePrevRequest = () => {
    if (!index) return

    setIndex((index + count - 1) % count)
  }

  const onMoveNextRequest = () => {
    if (!index) return

    setIndex((index + 1) % count)
  }

  return (
    <>
      {open && (
        <Lightbox
          mainSrc={sources[index]}
          nextSrc={sources[(index + 1) % count]}
          prevSrc={sources[(index + count - 1) % count]}
          onCloseRequest={onCloseRequest}
          onMovePrevRequest={onMovePrevRequest}
          onMoveNextRequest={onMoveNextRequest}
        />
      )}
      <GallerySimple photos={photos} onClick={setIndex} />
    </>
  )
}
