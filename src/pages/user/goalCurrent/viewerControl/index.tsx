import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import AddPoints from 'features/day/add-points'
import { GoalDto, MemberDto } from 'shared/api'
import Support from './support'

const Join = dynamic(() => import('./join'))
const Completion = dynamic(() => import('./completion'))

interface ViewerControlProps extends Pick<GoalDto, 'day' | 'calendar' | 'clientPoints'> {
  goalId: number
  ownerName: string
  forTomorrow: boolean
  clientPage: boolean
  clientMember?: MemberDto
}

function ViewerControl({
  goalId,
  day,
  calendar,
  clientPoints,
  ownerName,
  forTomorrow,
  clientPage,
  clientMember,
}: ViewerControlProps) {
  const completion = clientPage && day.id === clientMember?.dayId

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" gap={1}>
        <AddPoints goalId={goalId} day={day} clientPoints={clientPoints} />
        <Support dayId={day.id} ownerName={ownerName} />
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
