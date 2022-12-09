import { useState } from 'react'
import { PhotoDto } from '@features/feedback'
import AppLightBox from '@ui/AppLightBox/AppLightBox'
import GallerySimple from './GallerySimple'

export interface GalleryViewerProps {
  photos: PhotoDto[]
}

function GalleryViewer({ photos }: GalleryViewerProps) {
  const [index, setIndex] = useState<number>()
  const sources = photos.map(({ src }) => src)

  return (
    <>
      <AppLightBox sources={sources} index={index} setIndex={setIndex} />
      <GallerySimple photos={photos} onClick={setIndex} />
    </>
  )
}

export default GalleryViewer
