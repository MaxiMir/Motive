import dynamic from 'next/dynamic'
import { GoalDto, MemberDto } from 'dto'
import { getNextDayId } from './helper'

const EndOfDay = dynamic(() => import('./components/EndOfDay'))
const EndOfGoal = dynamic(() => import('./components/EndOfGoal'))

interface CompletionProps {
  goal: GoalDto
  forTomorrow: boolean
  clientMember: MemberDto
}

export default function Completion({ goal, forTomorrow, clientMember }: CompletionProps): JSX.Element {
  const nextDayId = getNextDayId(goal)

  return (
    <>
      {!nextDayId ? (
        <EndOfGoal goal={goal} forTomorrow={forTomorrow} />
      ) : (
        <EndOfDay goal={goal} nextDayId={nextDayId} forTomorrow={forTomorrow} clientMember={clientMember} />
      )}
    </>
  )
}
