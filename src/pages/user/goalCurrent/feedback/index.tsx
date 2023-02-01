import dynamic from 'next/dynamic'
import { DayDto } from 'shared/api'

const Content = dynamic(() => import('./content'))
const Soon = dynamic(() => import('./soon'))
const Creating = dynamic(() => import('./creating'))

interface FeedbackProps {
  goalId: number
  day: DayDto
  clientOwner: boolean
  forTomorrow: boolean
}

export function Feedback({ goalId, day, forTomorrow, clientOwner }: FeedbackProps) {
  return (
    <>
      {day.feedback ? (
        <Content feedback={day.feedback} />
      ) : (
        <>
          {!clientOwner ? (
            <Soon />
          ) : (
            <Creating goalId={goalId} dayId={day.id} forTomorrow={forTomorrow} />
          )}
        </>
      )}
    </>
  )
}
