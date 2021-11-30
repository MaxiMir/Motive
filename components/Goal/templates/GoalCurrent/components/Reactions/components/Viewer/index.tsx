import { Button } from '@material-ui/core'
import { MainCharacteristic, DayCharacteristics, UserBase, Goal, Role } from 'dto'
import useSWRData from 'hooks/useSWRData'
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
  const [data, mutate] = useSWRData()

  const onSet = (characteristic: MainCharacteristic, increase: boolean) => {
    const copiedGoals = [...data.user.goals]
    copiedGoals[copiedGoals.findIndex((g) => g.id === goal.id)] = {
      ...goal,
      characteristics: {
        ...goal.characteristics,
        [characteristic]: goal.characteristics[characteristic] + (increase ? 1 : -1),
      },
    }
    mutate({ ...data, user: { ...data.user, goals: copiedGoals } }, false)
  }

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
