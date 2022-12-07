import dynamic from 'next/dynamic'
import { OwnershipDto } from '@dto'
import useGoalContext from '@features/user/components/GoalCurrent/hooks/useGoalContext'

const Content = dynamic(() => import('./components/Content'))
const NotAdded = dynamic(() => import('./components/NotAdded'))

interface FeedbackProps {
  forTomorrow: boolean
  clientOwnership: OwnershipDto
}

function Feedback({ forTomorrow, clientOwnership }: FeedbackProps) {
  const { day } = useGoalContext()

  return (
    <>
      {day.feedback ? (
        <Content feedback={day.feedback} />
      ) : (
        <NotAdded forTomorrow={forTomorrow} clientOwnership={clientOwnership} />
      )}
    </>
  )
}

export default Feedback
