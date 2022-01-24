import { FC } from 'react'
import { InView } from 'react-intersection-observer'

interface AppInViewProps {
  onView: () => void
}

const AppInView: FC<AppInViewProps> = ({ children, onView }): JSX.Element => {
  return (
    <InView as="div" onChange={(inView) => inView && onView()}>
      {children}
    </InView>
  )
}

export default AppInView
