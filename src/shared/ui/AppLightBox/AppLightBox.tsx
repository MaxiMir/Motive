import dynamic from 'next/dynamic'
import 'react-image-lightbox/style.css'
import { getImageSrc } from '@href'
import { useMessages } from './hooks/useMessages'

const Lightbox = dynamic(() => import('react-image-lightbox'))

interface AppLightBoxProps {
  sources: string[]
  index?: number
  setIndex: (i?: number) => void
}

function AppLightBox({ sources, index, setIndex }: AppLightBoxProps) {
  const messages = useMessages()
  const open = typeof index === 'number'
  const sourcesFull = sources.map(getImageSrc)
  const count = sourcesFull.length

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
          nextLabel={messages.nextLabel}
          prevLabel={messages.prevLabel}
          closeLabel={messages.closeLabel}
          zoomInLabel={messages.zoomInLabel}
          zoomOutLabel={messages.zoomOutLabel}
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
