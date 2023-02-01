import dynamic from 'next/dynamic'
import { DayDto, OwnershipDto } from 'shared/api'

const Content = dynamic(() => import('./content'))
const Soon = dynamic(() => import('./soon'))
const Creating = dynamic(() => import('./creating'))

interface FeedbackProps {
  goalId: number
  day: DayDto
  forTomorrow: boolean
  clientOwnership: OwnershipDto
}

export function Feedback({ goalId, day, forTomorrow, clientOwnership }: FeedbackProps) {
  return (
    <>
      {day.feedback ? (
        <Content feedback={day.feedback} />
      ) : (
        <>
          {!clientOwnership.goal ? (
            <Soon />
          ) : (
            <Creating goalId={goalId} dayId={day.id} forTomorrow={forTomorrow} />
          )}
        </>
      )}
    </>
  )
}
