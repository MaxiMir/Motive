import dynamic from 'next/dynamic'
import { ViewerProps } from './components/Viewer'

const Viewer = dynamic(() => import('./components/Viewer'))
const Owner = dynamic(() => import('./components/Owner'))
const OwnerWithFeedback = dynamic(() => import('./components/OwnerWithFeedback'))

export default function Reactions(props: ViewerProps): JSX.Element {
  switch (props.role) {
    case 'OWNER':
      if (!props.lastDay) {
        return <></>
      }

      return !props.goal.days[0].feedback ? <Owner goal={props.goal} /> : <OwnerWithFeedback goal={props.goal} />
    default:
      return <Viewer {...props} />
  }
}
