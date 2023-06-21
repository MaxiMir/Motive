import dynamic from 'next/dynamic'
import { CalendarDto, MemberDto } from 'shared/api'
import { getNextDayId } from './lib'

const EndOfDay = dynamic(() => import('./endOfDay'))
const Done = dynamic(() => import('./done'))

interface CompletionProps {
  goalId: number
  dayId: number
  calendar: CalendarDto[]
  forTomorrow: boolean
  clientMember: MemberDto
}

function Completion({ goalId, dayId, calendar, forTomorrow, clientMember }: CompletionProps) {
  const nextDayId = getNextDayId(dayId, calendar)

  return (
    <>
      {!nextDayId ? (
        <Done goalId={goalId} forTomorrow={forTomorrow} />
      ) : (
        <EndOfDay
          goalId={goalId}
          nextDayId={nextDayId}
          forTomorrow={forTomorrow}
          clientMember={clientMember}
        />
      )}
    </>
  )
}

export default Completion
