import dynamic from 'next/dynamic'
import { ViewerProps } from './components/Viewer'
import { OwnerProps } from './components/Owner'

const Viewer = dynamic(() => import('./components/Viewer'))
const Owner = dynamic(() => import('./components/Owner'))
const OwnerWithFeedback = dynamic(() => import('./components/OwnerWithFeedback'))

type ReactionsProps = ViewerProps & OwnerProps & { isGoalOwner: boolean }

export default function Reactions({ isGoalOwner, goal, owner, forTomorrow, isPageOwner }: ReactionsProps): JSX.Element {
  if (!isGoalOwner) {
    return <Viewer goal={goal} owner={owner} isPageOwner={isPageOwner} />
  }

  return goal.day.feedback ? <OwnerWithFeedback goal={goal} /> : <Owner goal={goal} forTomorrow={forTomorrow} />
}
