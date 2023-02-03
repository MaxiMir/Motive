import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import AddReaction from 'features/day/add-reaction'
import { DAY_CHARACTERISTIC, CalendarDto, DayDto, ReactionsDto, MemberDto } from 'shared/api'
import ReactionSupport from './reactionSupport'

const Join = dynamic(() => import('./join'))
const Completion = dynamic(() => import('./completion'))

interface ViewerControlProps {
  goalId: number
  day: DayDto
  calendar: CalendarDto[]
  reactions: ReactionsDto
  ownerName: string
  forTomorrow: boolean
  clientPage: boolean
  clientMember?: MemberDto
}

function ViewerControl({
  goalId,
  day,
  calendar,
  reactions,
  ownerName,
  forTomorrow,
  clientPage,
  clientMember,
}: ViewerControlProps) {
  const completion = clientPage && day.id === clientMember?.dayId

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" gap={1}>
        {DAY_CHARACTERISTIC.map((name) => (
          <AddReaction
            name={name}
            goalId={goalId}
            dayId={day.id}
            reactions={reactions[name]}
            count={day.characteristic?.[name]}
            key={name}
          />
        ))}
        <ReactionSupport dayId={day.id} ownerName={ownerName} />
      </Stack>
      {!clientMember ? (
        <Join goalId={goalId} dayId={day.id} calendar={calendar} ownerName={ownerName} />
      ) : (
        <>
          {completion && (
            <Completion
              goalId={goalId}
              dayId={day.id}
              calendar={calendar}
              forTomorrow={forTomorrow}
              clientMember={clientMember}
            />
          )}
        </>
      )}
    </Stack>
  )
}

export default ViewerControl
