import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import 'react-image-lightbox/style.css'
import { PhotoDto } from '@dto'
import { getImageSrc } from '@href'
import GallerySimple from './GallerySimple'

const Lightbox = dynamic(() => import('react-image-lightbox'))

export interface GalleryViewerProps {
  photos: PhotoDto[]
}

export default function GalleryViewer({ photos }: GalleryViewerProps) {
  const { formatMessage } = useIntl()
  const [index, setIndex] = useState<number>()
  const sources = photos.map(({ src }) => getImageSrc(src))
  const nextLabel = formatMessage({ id: 'common.next' })
  const prevLabel = formatMessage({ id: 'common.previous' })
  const open = typeof index === 'number'
  const count = sources.length

  const onCloseRequest = () => setIndex(undefined)

  const onMovePrevRequest = () => {
    if (!open) return

    setIndex((index + count - 1) % count)
  }

  const onMoveNextRequest = () => {
    if (!open) return

    setIndex((index + 1) % count)
  }

  return (
    <>
      {open && (
        <Lightbox
          nextLabel={nextLabel}
          prevLabel={prevLabel}
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
