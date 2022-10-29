import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { DAY_CHARACTERISTIC, GoalDto, OwnershipDto, UserBaseDto } from '@dto'
import ReactionWithSend from './components/ReactionWithSend'
import ReactionSupport from './components/ReactionSupport'
import { checkOnCompletion } from './helper'

const Join = dynamic(() => import('./components/Join'))
const Completion = dynamic(() => import('./components/Completion'))

export interface ViewerProps {
  goal: GoalDto
  owner: UserBaseDto
  forTomorrow: boolean
  clientOwnership: OwnershipDto
}

export default function Viewer({ goal, owner, forTomorrow, clientOwnership }: ViewerProps) {
  const completion = checkOnCompletion(clientOwnership, goal)

  return (
    <Box display="flex" justifyContent="space-between" flexWrap="wrap">
      <Box display="flex" gap={1}>
        {DAY_CHARACTERISTIC.map((name) => (
          <ReactionWithSend goal={goal} name={name} key={name} />
        ))}
        <ReactionSupport goal={goal} owner={owner} />
      </Box>
      {!clientOwnership.member ? (
        <Join goal={goal} />
      ) : (
        <>{completion && <Completion goal={goal} forTomorrow={forTomorrow} clientMember={clientOwnership.member} />}</>
      )}
    </Box>
  )
}
