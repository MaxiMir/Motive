import dynamic from 'next/dynamic'
import { CalendarDto } from 'shared/api'
import { getNextDayId } from './lib'

const EndOfDay = dynamic(() => import('./endOfDay'))
const Done = dynamic(() => import('./done'))

interface CompletionProps {
  goalId: number
  dayId: number
  calendar: CalendarDto[]
  forFuture: boolean
  viewerMemberId: number
}

function Completion({ goalId, dayId, calendar, forFuture, viewerMemberId }: CompletionProps) {
  const nextDayId = getNextDayId(dayId, calendar)

  return (
    <>
      {!nextDayId ? (
        <Done goalId={goalId} forFuture={forFuture} />
      ) : (
        <EndOfDay
          goalId={goalId}
          nextDayId={nextDayId}
          forFuture={forFuture}
          viewerMemberId={viewerMemberId}
        />
      )}
    </>
  )
}

export default Completion
