import dynamic from 'next/dynamic'
import { ViewerProps } from './components/Viewer'
import { OwnerProps } from './components/Owner'

const Viewer = dynamic(() => import('./components/Viewer'))
const Owner = dynamic(() => import('./components/Owner'))
const OwnerWithFeedback = dynamic(() => import('./components/OwnerWithFeedback'))

export default function Actions({ goal, owner, forTomorrow, clientOwnership }: ViewerProps & OwnerProps): JSX.Element {
  if (!clientOwnership.goal) {
    return <Viewer goal={goal} owner={owner} forTomorrow={forTomorrow} clientOwnership={clientOwnership} />
  }

  return goal.day.feedback ? <OwnerWithFeedback goal={goal} /> : <Owner goal={goal} forTomorrow={forTomorrow} />
}
