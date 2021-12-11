import produce from 'immer'
import { Button } from '@material-ui/core'
import { MainCharacteristicName, DayCharacteristic, UserBase, Goal, Role } from 'dto'
import useMutateGoals from 'hooks/useMutateGoals'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import ReactionWithSend from './components/ReactionWithSend'
import Reaction from './components/Reaction'

export interface ViewerProps {
  role: Role
  dayId: string
  goal: Goal
  characteristic: DayCharacteristic
  owner: UserBase
}

export default function Viewer({ role, dayId, goal, characteristic, owner }: ViewerProps): JSX.Element {
  const [goals, mutateGoals] = useMutateGoals()

  const onSet = (value: MainCharacteristicName, increase: boolean) =>
    mutateGoals(
      produce(goals, (draft: Goal[]) => {
        draft[draft.findIndex((g) => g.id === goal.id)].characteristic[value] += increase ? 1 : -1
      }),
    )

  return (
    <AppBox justifyContent="space-between">
      <AppBox spacing={1}>
        {(['motivation', 'creativity'] as MainCharacteristicName[]).map((name) => (
          <ReactionWithSend dayId={dayId} name={name} active={characteristic[name]} key={name} onSet={onSet} />
        ))}
        <Reaction
          name="support"
          active={false}
          title={`Support ${owner.id}`}
          onClick={() => console.log('TODO LOGIC!')}
        />
      </AppBox>
      <Button
        variant="outlined"
        color={role === 'MEMBER' ? 'primary' : 'secondary'}
        startIcon={<AppEmoji name={role === 'MEMBER' ? 'unsubscribe' : 'subscribe'} onlyEmoji />}
      >
        {role === 'MEMBER' ? 'Leave' : 'JOIN'}
      </Button>
    </AppBox>
  )
}
