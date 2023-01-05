import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import 'react-image-lightbox/style.css'
import { getImageSrc } from '@href'

const Lightbox = dynamic(() => import('react-image-lightbox'))

interface AppLightBoxProps {
  sources: string[]
  index?: number
  setIndex: (i?: number) => void
}

function AppLightBox({ sources, index, setIndex }: AppLightBoxProps) {
  const { formatMessage } = useIntl()
  const open = typeof index === 'number'
  const sourcesFull = sources.map(getImageSrc)
  const count = sourcesFull.length
  const nextLabel = formatMessage({ id: 'common.next' })
  const prevLabel = formatMessage({ id: 'common.previous' })
  const zoomInLabel = formatMessage({ id: 'common.zoom-in' })
  const zoomOutLabel = formatMessage({ id: 'common.zoom-out' })
  const closeLabel = formatMessage({ id: 'common.close' })

  const onMovePrevRequest = () => {
    if (!open) return

    setIndex((index + count - 1) % count)
  }

  const onMoveNextRequest = () => {
    if (!open) return

    setIndex((index + 1) % count)
  }

  const onCloseRequest = () => setIndex(undefined)

  return (
    <>
      {open && (
        <Lightbox
          nextLabel={nextLabel}
          prevLabel={prevLabel}
          closeLabel={closeLabel}
          zoomInLabel={zoomInLabel}
          zoomOutLabel={zoomOutLabel}
          mainSrc={sourcesFull[index]}
          nextSrc={sourcesFull[(index + 1) % count]}
          prevSrc={sourcesFull[(index + count - 1) % count]}
          onCloseRequest={onCloseRequest}
          onMovePrevRequest={onMovePrevRequest}
          onMoveNextRequest={onMoveNextRequest}
        />
      )}
    </>
  )
}

export default AppLightBox
