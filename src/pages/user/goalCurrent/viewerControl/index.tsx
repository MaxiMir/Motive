import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import AddReaction from 'features/day/add-reaction'
import { DAY_CHARACTERISTIC, CalendarDto, OwnershipDto, DayDto, ReactionsDto } from 'shared/api'
import { checkOnCompletion } from './lib'
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
  clientOwnership: OwnershipDto
}

function ViewerControl({
  goalId,
  day,
  calendar,
  reactions,
  ownerName,
  forTomorrow,
  clientOwnership,
}: ViewerControlProps) {
  const completion = checkOnCompletion(clientOwnership, day.id)

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" spacing={1}>
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
      {!clientOwnership.member ? (
        <Join goalId={goalId} dayId={day.id} calendar={calendar} ownerName={ownerName} />
      ) : (
        <>
          {completion && (
            <Completion
              goalId={goalId}
              dayId={day.id}
              calendar={calendar}
              forTomorrow={forTomorrow}
              clientMember={clientOwnership.member}
            />
          )}
        </>
      )}
    </Stack>
  )
}

export default ViewerControl
