import dynamic from 'next/dynamic'
import { GoalDto, OwnershipDto } from '@dto'

const Content = dynamic(() => import('./components/Content'))
const NotAdded = dynamic(() => import('./components/NotAdded'))

interface FeedbackProps {
  goal: GoalDto
  forTomorrow: boolean
  clientOwnership: OwnershipDto
}

export default function Feedback({ goal, forTomorrow, clientOwnership }: FeedbackProps) {
  const { feedback } = goal.day

  return (
    <>
      {feedback ? (
        <Content feedback={feedback} />
      ) : (
        <NotAdded goal={goal} forTomorrow={forTomorrow} clientOwnership={clientOwnership} />
      )}
    </>
  )
}
