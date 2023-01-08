import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import { getImageSrc } from '@href'

const Lightbox = dynamic(() => import('yet-another-react-lightbox'))

interface AppLightBoxProps {
  sources: string[]
  index?: number
  onClose: () => void
}

function AppLightBox({ sources, index, onClose }: AppLightBoxProps) {
  const { formatMessage } = useIntl()
  const nextLabel = formatMessage({ id: 'common.next' })
  const prevLabel = formatMessage({ id: 'common.previous' })
  const zoomInLabel = formatMessage({ id: 'common.zoom-in' })
  const zoomOutLabel = formatMessage({ id: 'common.zoom-out' })
  const closeLabel = formatMessage({ id: 'common.close' })
  const playLabel = formatMessage({ id: 'common.play' })
  const fullscreenLabel = formatMessage({ id: 'common.fullscreen' })
  const slides = sources.map((source) => ({ src: getImageSrc(source) }))
  const single = sources.length === 1
  const plugins = [Fullscreen, Slideshow, Zoom, ...(single ? [] : [Thumbnails])]

  return (
    <Lightbox
      index={index}
      slides={slides}
      open
      labels={{
        Next: nextLabel,
        Prev: prevLabel,
        Play: playLabel,
        'Enter Fullscreen': fullscreenLabel,
        Close: closeLabel,
        'Zoom in': zoomInLabel,
        'Zoom out': zoomOutLabel,
      }}
      close={onClose}
      plugins={plugins}
    />
  )
}

export default AppLightBox
