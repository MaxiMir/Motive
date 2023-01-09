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
  const slides = sources.map((source) => ({ src: getImageSrc(source) }))
  const single = sources.length === 1
  const plugins = [Fullscreen, Slideshow, Zoom, ...(single ? [] : [Thumbnails])]

  return (
    <Lightbox
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

export default AppLightBox
