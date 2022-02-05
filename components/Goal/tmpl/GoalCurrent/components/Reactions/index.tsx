import dynamic from 'next/dynamic'
import { ViewerProps } from './components/Viewer'
import { OwnerProps } from './components/Owner'

const Viewer = dynamic(() => import('./components/Viewer'))
const Owner = dynamic(() => import('./components/Owner'))
const OwnerWithFeedback = dynamic(() => import('./components/OwnerWithFeedback'))

export default function Reactions(props: ViewerProps & OwnerProps): JSX.Element {
  switch (props.role) {
    case 'OWNER':
      return props.goal.day.feedback ? (
        <OwnerWithFeedback goal={props.goal} />
      ) : (
        <Owner goal={props.goal} forTomorrow={props.forTomorrow} />
      )
    default:
      return <Viewer {...props} />
  }
}
