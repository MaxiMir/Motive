import dynamic from 'next/dynamic'
import { GoalDto, OwnershipDto } from '@dto'

const Soon = dynamic(() => import('./components/Soon'))
const FeedbackAdd = dynamic(() => import('./components/FeedbackAdd'))

interface NotAddedProps {
  goal: GoalDto
  forTomorrow: boolean
  clientOwnership: OwnershipDto
}

function NotAdded({ goal, forTomorrow, clientOwnership }: NotAddedProps) {
  return <>{!clientOwnership.goal ? <Soon /> : <FeedbackAdd goal={goal} forTomorrow={forTomorrow} />}</>
}

export default NotAdded
