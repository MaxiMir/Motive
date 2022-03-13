import dynamic from 'next/dynamic'
import { ViewerProps } from './components/Viewer'
import { OwnerProps } from './components/Owner'

const Viewer = dynamic(() => import('./components/Viewer'))
const Owner = dynamic(() => import('./components/Owner'))
const OwnerWithFeedback = dynamic(() => import('./components/OwnerWithFeedback'))

type ReactionsProps = ViewerProps & OwnerProps & { isOwner: boolean }

export default function Controls({ isOwner, goal, owner, member, forTomorrow }: ReactionsProps): JSX.Element {
  if (!isOwner) {
    return <Viewer goal={goal} owner={owner} member={member} />
  }

  return goal.day.feedback ? <OwnerWithFeedback goal={goal} /> : <Owner goal={goal} forTomorrow={forTomorrow} />
}
