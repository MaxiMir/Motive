import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import { getImageSrc } from '@lib/helpers/url'

const ReactLightbox = dynamic(() => import('yet-another-react-lightbox'))

interface LightBoxProps {
  sources: string[]
  index?: number
  onClose: () => void
}

function LightBox({ sources, index, onClose }: LightBoxProps) {
  const { formatMessage } = useIntl()
  const slides = sources.map((source) => ({ src: getImageSrc(source) }))
  const single = sources.length === 1
  const plugins = [Fullscreen, Slideshow, Zoom, ...(single ? [] : [Thumbnails])]

  return (
    <ReactLightbox
      index={index}
      slides={slides}
      open
      labels={{
        Next: formatMessage({ id: 'common.next' }),
        Prev: formatMessage({ id: 'common.previous' }),
        Play: formatMessage({ id: 'common.play' }),
        'Enter Fullscreen': formatMessage({ id: 'common.fullscreen' }),
        Close: formatMessage({ id: 'common.close' }),
        'Zoom in': formatMessage({ id: 'common.zoom-in' }),
        'Zoom out': formatMessage({ id: 'common.zoom-out' }),
      }}
      close={onClose}
      plugins={plugins}
    />
  )
}

export default LightBox
