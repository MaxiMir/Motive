import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import UpdatePoints from 'features/day/update-points'
import { ViewerPart } from 'entities/viewer'
import { GoalDto } from 'shared/api'
import Support from './support'

const Completion = dynamic(() => import('./completion'))

interface ViewerActsProps {
  goal: GoalDto
  forTomorrow: boolean
  viewerPart: ViewerPart
}

function ViewerActs({ goal, forTomorrow, viewerPart }: ViewerActsProps) {
  const { id, day, viewerPoints, owner, calendar } = goal
  const completion = viewerPart.page && day.id === viewerPart.member?.dayId

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" gap={1}>
        <UpdatePoints goalId={id} day={day} viewerPoints={viewerPoints} />
        <Support dayId={day.id} ownerName={owner.name} />
      </Stack>
      {viewerPart.member && completion && (
        <Completion
          goalId={id}
          dayId={day.id}
          calendar={calendar}
          forTomorrow={forTomorrow}
          viewerMemberId={viewerPart.member.id}
        />
      )}
    </Stack>
  )
}

export default ViewerActs
