import { ReactNode } from 'react'
import { InView } from 'react-intersection-observer'

interface AppInViewProps {
  triggerOnce?: boolean
  children?: ReactNode
  onView: () => void
}

export default function AppInView({ triggerOnce, children, onView }: AppInViewProps) {
  return (
    <InView as="div" triggerOnce={triggerOnce} onChange={(inView) => inView && onView()}>
      {children}
    </InView>
  )
}