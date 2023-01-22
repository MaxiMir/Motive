import { ReactNode } from 'react'
import { InView as InViewLib } from 'react-intersection-observer'

interface InViewProps {
  triggerOnce?: boolean
  children?: ReactNode
  onView: () => void
}

function InView({ triggerOnce, children, onView }: InViewProps) {
  return (
    <InViewLib as="div" triggerOnce={triggerOnce} onChange={(inView) => inView && onView()}>
      {children}
    </InViewLib>
  )
}

export default InView
