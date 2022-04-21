import { ReactNode } from 'react'
import { InView } from 'react-intersection-observer'

interface AppInViewProps {
  children?: ReactNode
  onView: () => void
}

export default function AppInView({ children, onView }: AppInViewProps) {
  return (
    <InView as="div" onChange={(inView) => inView && onView()}>
      {children}
    </InView>
  )
}
