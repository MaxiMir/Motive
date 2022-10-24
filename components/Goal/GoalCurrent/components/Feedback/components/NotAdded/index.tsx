import dynamic from 'next/dynamic'
import { GoalDto, OwnershipDto } from 'dto'

const Soon = dynamic(() => import('./components/Soon'))
const FeedbackAdd = dynamic(() => import('./components/FeedbackAdd'))

export interface NotAddedProps {
  goal: GoalDto
  forTomorrow: boolean
  clientOwnership: OwnershipDto
}

export default function NotAdded({ goal, forTomorrow, clientOwnership }: NotAddedProps) {
  return <>{!clientOwnership.goal ? <Soon /> : <FeedbackAdd goal={goal} forTomorrow={forTomorrow} />}</>
}
