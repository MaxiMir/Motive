import dynamic from 'next/dynamic'
import { ViewerProps } from './components/Viewer'
import { OwnerProps } from './components/Owner'

const Viewer = dynamic(() => import('./components/Viewer'))
const Owner = dynamic(() => import('./components/Owner'))
const OwnerWithFeedback = dynamic(() => import('./components/OwnerWithFeedback'))

type ReactionsProps = ViewerProps & OwnerProps & { isGoalOwner: boolean }

export default function Controls({ isGoalOwner, goal, owner, forTomorrow }: ReactionsProps): JSX.Element {
  if (!isGoalOwner) {
    return <Viewer goal={goal} owner={owner} />
  }

  return goal.day.feedback ? <OwnerWithFeedback goal={goal} /> : <Owner goal={goal} forTomorrow={forTomorrow} />
}
