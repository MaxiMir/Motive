import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import { UserBaseDto } from '@features/user'
import { OwnershipDto } from '@features/member'
import { DAY_CHARACTERISTIC } from '@features/day'
import ReactionWithSend from './components/ReactionWithSend'
import ReactionSupport from './components/ReactionSupport'
import { checkOnCompletion } from './helper'

const Join = dynamic(() => import('./components/Join'))
const Completion = dynamic(() => import('./components/Completion'))

interface ViewerProps {
  owner: UserBaseDto
  forTomorrow: boolean
  clientOwnership: OwnershipDto
}

function Viewer({ owner, forTomorrow, clientOwnership }: ViewerProps) {
  const { day } = useGoalContext()
  const completion = checkOnCompletion(clientOwnership, day.id)

  return (
    <Box display="flex" justifyContent="space-between" flexWrap="wrap">
      <Box display="flex" gap={1}>
        {DAY_CHARACTERISTIC.map((name) => (
          <ReactionWithSend name={name} key={name} />
        ))}
        <ReactionSupport owner={owner} />
      </Box>
      {!clientOwnership.member ? (
        <Join />
      ) : (
        <>{completion && <Completion forTomorrow={forTomorrow} clientMember={clientOwnership.member} />}</>
      )}
    </Box>
  )
}

export default Viewer
