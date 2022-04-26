import { ReactNode } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

interface AppScrollbarProps {
  children: ReactNode
}

export default function AppScrollbar({ children }: AppScrollbarProps) {
  return <PerfectScrollbar>{children}</PerfectScrollbar>
}
