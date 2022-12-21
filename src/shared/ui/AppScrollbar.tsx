import { ReactNode, CSSProperties } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

interface AppScrollbarProps {
  style?: CSSProperties
  children: ReactNode
}

function AppScrollbar({ style, children }: AppScrollbarProps) {
  return <PerfectScrollbar style={style}>{children}</PerfectScrollbar>
}

export default AppScrollbar
