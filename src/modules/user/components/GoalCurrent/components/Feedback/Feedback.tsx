import dynamic from 'next/dynamic'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import { OwnershipDto } from '@features/member'

const Content = dynamic(() => import('./components/Content'))
const Soon = dynamic(() => import('./components/Soon'))
const FeedbackAdd = dynamic(() => import('./components/FeedbackAdd'))

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
        <>{!clientOwnership.goal ? <Soon /> : <FeedbackAdd forTomorrow={forTomorrow} />}</>
      )}
    </>
  )
}

export default Feedback
