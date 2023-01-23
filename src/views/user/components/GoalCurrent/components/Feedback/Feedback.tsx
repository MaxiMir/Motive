import dynamic from 'next/dynamic'
import { useGoalContext } from '@views/user/components/GoalCurrent/hooks/useGoalContext'
import { OwnershipDto } from '@modules/member'

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
