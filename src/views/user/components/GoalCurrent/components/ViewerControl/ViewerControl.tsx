import dynamic from 'next/dynamic'
import { Stack } from '@mui/material'
import { useGoalContext } from '@views/user/components/GoalCurrent/hooks/useGoalContext'
import { UserBaseDto } from '@features/user'
import { OwnershipDto } from '@features/member'
import { DAY_CHARACTERISTIC } from '@features/day'
import ReactionWithSend from './components/ReactionWithSend'
import ReactionSupport from './components/ReactionSupport'
import { checkOnCompletion } from './helper'

const Join = dynamic(() => import('./components/Join'))
const Completion = dynamic(() => import('./components/Completion'))

interface ViewerControlProps {
  owner: UserBaseDto
  forTomorrow: boolean
  clientOwnership: OwnershipDto
}

function ViewerControl({ owner, forTomorrow, clientOwnership }: ViewerControlProps) {
  const { day } = useGoalContext()
  const completion = checkOnCompletion(clientOwnership, day.id)

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" spacing={1}>
        {DAY_CHARACTERISTIC.map((name) => (
          <ReactionWithSend name={name} key={name} />
        ))}
        <ReactionSupport owner={owner} />
      </Stack>
      {!clientOwnership.member ? (
        <Join />
      ) : (
        <>
          {completion && (
            <Completion forTomorrow={forTomorrow} clientMember={clientOwnership.member} />
          )}
        </>
      )}
    </Stack>
  )
}

export default ViewerControl
