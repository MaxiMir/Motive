import { UserBaseDto, GoalDto, DayCharacteristicName, MemberDto, OwnershipDto } from 'dto'
import AppBox from 'components/UI/AppBox'
import ReactionWithSend from './components/ReactionWithSend'
import ReactionSupport from './components/ReactionSupport'
import Membership from './components/Membership'

export interface ViewerProps {
  goal: GoalDto
  owner: UserBaseDto
  clientMember?: MemberDto
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
      </AppBox>
      <Membership goal={goal} clientOwnership={clientOwnership} />
    </AppBox>
  )
}
