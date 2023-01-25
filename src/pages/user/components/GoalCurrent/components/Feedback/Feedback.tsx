import dynamic from 'next/dynamic'
import { OwnershipDto } from '@shared/api/member'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'

const Content = dynamic(() => import('./components/Content'))
const Soon = dynamic(() => import('./components/Soon'))
const Adding = dynamic(() => import('./components/Adding'))

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
        <>{!clientOwnership.goal ? <Soon /> : <Adding forTomorrow={forTomorrow} />}</>
      )}
    </>
  )
}

export default Feedback
