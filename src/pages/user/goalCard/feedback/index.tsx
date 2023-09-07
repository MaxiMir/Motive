import dynamic from 'next/dynamic'
import { DayDto } from 'shared/api'

const Cont = dynamic(() => import('./cont'))
const Soon = dynamic(() => import('./soon'))
const Creating = dynamic(() => import('./creating'))

interface FeedbackProps {
  goalId: number
  day: DayDto
  viewerGoal: boolean
  forFuture: boolean
}

export function Feedback({ goalId, day, forFuture, viewerGoal }: FeedbackProps) {
  return (
    <>
      {day.feedback ? (
        <Cont feedback={day.feedback} />
      ) : (
        <>
          {!viewerGoal ? (
            <Soon />
          ) : (
            <Creating goalId={goalId} dayId={day.id} forFuture={forFuture} />
          )}
        </>
      )}
    </>
  )
}
