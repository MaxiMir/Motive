import produce from 'immer'
import { Button } from '@material-ui/core'
import { MainCharacteristic, DayCharacteristics, UserBase, Goal, Role } from 'dto'
import useMutateGoals from 'hooks/useMutateGoals'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import ReactionWithSend from './components/ReactionWithSend'
import Reaction from './components/Reaction'

export interface ViewerProps {
  role: Role
  dayId: string
  goal: Goal
  characteristics: DayCharacteristics
  owner: UserBase
}

export default function Viewer({ role, dayId, goal, characteristics, owner }: ViewerProps): JSX.Element {
  const [goals, mutateGoals] = useMutateGoals()

  const onSet = (characteristic: MainCharacteristic, increase: boolean) =>
    mutateGoals(
      produce(goals, (draft: Goal[]) => {
        draft[draft.findIndex((g) => g.id === goal.id)].characteristics[characteristic] += increase ? 1 : -1
      }),
    )

  return (
    <AppBox justifyContent="space-between">
      <AppBox spacing={1}>
        {(['motivation', 'creativity'] as MainCharacteristic[]).map((characteristic) => (
          <ReactionWithSend
            dayId={dayId}
            characteristic={characteristic}
            active={characteristics[characteristic]}
            key={characteristic}
            onSet={onSet}
          />
        ))}
        <Reaction
          characteristic="support"
          active={false}
          title={`Support ${owner.fullName}`}
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
