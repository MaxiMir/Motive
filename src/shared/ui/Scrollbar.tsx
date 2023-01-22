import { ReactNode, CSSProperties } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

interface ScrollbarProps {
  style?: CSSProperties
  children: ReactNode
}

function Scrollbar({ style, children }: ScrollbarProps) {
  return <PerfectScrollbar style={style}>{children}</PerfectScrollbar>
}

export default Scrollbar
