import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import UpdatePoints from 'features/day/update-points'
import { ViewerPart } from 'entities/viewer'
import { GoalDto } from 'shared/api'
import Support from './support'

const Act = dynamic(() => import('./act'))

interface ViewerActsProps {
  goal: GoalDto
  forFuture: boolean
  viewerPart: ViewerPart
}

function ViewerActs({ goal, forFuture, viewerPart }: ViewerActsProps) {
  const { id, day, viewerPoints, owner, calendar } = goal
  const completion = viewerPart.page && day.id === viewerPart.member?.dayId

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" gap={1}>
        <UpdatePoints goalId={id} day={day} viewerPoints={viewerPoints} />
        <Support dayId={day.id} ownerName={owner.name} />
      </Stack>
      {viewerPart.member && completion && (
        <Act
          goalId={id}
          dayId={day.id}
          calendar={calendar}
          forFuture={forFuture}
          viewerMemberId={viewerPart.member.id}
        />
      )}
    </Stack>
  )
}

export default ViewerActs
