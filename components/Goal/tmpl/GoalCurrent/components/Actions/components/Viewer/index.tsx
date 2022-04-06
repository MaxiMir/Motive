import dynamic from 'next/dynamic'
import { UserBaseDto, GoalDto, DayCharacteristicName, OwnershipDto } from 'dto'
import AppBox from 'components/UI/AppBox'
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

export default function Viewer({ goal, owner, forTomorrow, clientOwnership }: ViewerProps): JSX.Element {
  const completion = checkOnCompletion(clientOwnership, goal)

  return (
    <AppBox justifyContent="space-between" flexWrap="wrap">
      <AppBox gap={1}>
        {(['motivation', 'creativity'] as DayCharacteristicName[]).map((name) => (
          <ReactionWithSend goal={goal} name={name} key={name} />
        ))}
        <ReactionSupport goal={goal} owner={owner} />
      </AppBox>
      {!clientOwnership.member ? (
        <Join goal={goal} />
      ) : (
        <>{completion && <Completion goal={goal} forTomorrow={forTomorrow} clientMember={clientOwnership.member} />}</>
      )}
    </AppBox>
  )
}
