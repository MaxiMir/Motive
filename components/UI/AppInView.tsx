import { FC } from 'react'
import { InView } from 'react-intersection-observer'

interface AppInViewProps {
  onChange: (inView: boolean) => void
}

const AppInView: FC<AppInViewProps> = (props): JSX.Element => <InView as="div" {...props} />

export default AppInView
