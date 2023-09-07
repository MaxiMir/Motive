import dynamic from 'next/dynamic'
import { CalendarDto } from 'shared/api'
import { getNextDayId } from './lib'

const EndOfDay = dynamic(() => import('./endOfDay'))
const Completion = dynamic(() => import('./completion'))

interface ActProps {
  goalId: number
  dayId: number
  calendar: CalendarDto
  forFuture: boolean
  viewerMemberId: number
}

function Act({ goalId, dayId, calendar, forFuture, viewerMemberId }: ActProps) {
  const nextDayId = getNextDayId(dayId, calendar)

  return (
    <>
      {!nextDayId ? (
        <Completion goalId={goalId} forFuture={forFuture} />
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

export default Act
