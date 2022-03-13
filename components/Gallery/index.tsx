import dynamic from 'next/dynamic'
import { GalleryViewerProps } from './tmpl/GalleryViewer'
import { GallerySimpleProps } from './tmpl/GallerySimple'
import { getPhotosWithSource } from './helper'

const GallerySimple = dynamic(() => import('./tmpl/GallerySimple'))
const GalleryViewer = dynamic(() => import('./tmpl/GalleryViewer'))

export default function Gallery({ photos, ...props }: GallerySimpleProps | GalleryViewerProps): JSX.Element {
  const photosWithSource = getPhotosWithSource(photos)

  switch (props.tmpl) {
    case 'simple':
      return <GallerySimple photos={photosWithSource} {...props} />
    case 'viewer':
      return <GalleryViewer photos={photosWithSource} {...props} />
  }
}
