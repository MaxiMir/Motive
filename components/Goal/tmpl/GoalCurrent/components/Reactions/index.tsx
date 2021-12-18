import dynamic from 'next/dynamic'
import { ViewerProps } from './components/Viewer'

const Viewer = dynamic(() => import('./components/Viewer'))
const Owner = dynamic(() => import('./components/Owner'))
const OwnerWithFeedback = dynamic(() => import('./components/OwnerWithFeedback'))

export default function Reactions(props: ViewerProps): JSX.Element {
  switch (props.role) {
    case 'OWNER':
      return !props.goal.day.feedbackId ? <Owner /> : <OwnerWithFeedback />
    default:
      return <Viewer {...props} />
  }
}
