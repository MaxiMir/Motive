import dynamic from 'next/dynamic'
import { UserBaseDto, GoalDto, DayCharacteristicName, OwnershipDto } from 'dto'
import AppBox from 'components/UI/AppBox'
import ReactionWithSend from './components/ReactionWithSend'
import ReactionSupport from './components/ReactionSupport'

const Join = dynamic(() => import('./components/Join'))
const Leave = dynamic(() => import('./components/Leave'))
const Finish = dynamic(() => import('./components/Finish'))

export interface ViewerProps {
  goal: GoalDto
  owner: UserBaseDto
  clientOwnership: OwnershipDto
}

export default function Viewer({ goal, owner, clientOwnership }: ViewerProps): JSX.Element {
  return (
    <AppBox justifyContent="space-between">
      <AppBox spacing={1}>
        {(['motivation', 'creativity'] as DayCharacteristicName[]).map((name) => (
          <ReactionWithSend goal={goal} name={name} key={name} />
        ))}
        <ReactionSupport goal={goal} owner={owner} />
        {clientOwnership.member && <Leave goal={goal} clientOwnership={clientOwnership} />}
      </AppBox>
      {!clientOwnership.member ? (
        <Join goal={goal} />
      ) : (
        <>
          {goal.day.id === clientOwnership.member.dayId && <Finish goal={goal} clientMember={clientOwnership.member} />}
        </>
      )}
    </AppBox>
  )
}
