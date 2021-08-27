import { FC } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const AppZoom: FC = ({ children }) => {
  return (
    <Zoom overlayBgColorEnd="rgba(34, 34, 34, 0.75)" zoomMargin={10}>
      {children}
    </Zoom>
  )
}

export default AppZoom
