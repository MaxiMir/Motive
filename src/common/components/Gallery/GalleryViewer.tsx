import { useState } from 'react'
import { PhotoDto } from '@dto'
import AppLightBox from '@ui/AppLightBox'
import GallerySimple from './GallerySimple'

export interface GalleryViewerProps {
  photos: PhotoDto[]
}

export default function GalleryViewer({ photos }: GalleryViewerProps) {
  const [index, setIndex] = useState<number>()
  const sources = photos.map(({ src }) => src)

  return (
    <>
      <AppLightBox sources={sources} index={index} setIndex={setIndex} />
      <GallerySimple photos={photos} onClick={setIndex} />
    </>
  )
}
