import { Button } from '@material-ui/core'
import { MainCharacteristic, DayCharacteristics, Role, UserBase, Goal } from 'dto'
import useSWRDetail from 'hooks/useSWRDetail'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import ReactionWithSend from './components/ReactionWithSend'
import Reaction from './components/Reaction'

export interface MemberProps {
  role: Role
  dayId: string
  goal: Goal
  characteristics: DayCharacteristics
  owner: UserBase
}

export default function Member({ dayId, goal, characteristics, owner }: MemberProps): JSX.Element {
  const [data, mutate] = useSWRDetail()

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
      <Button variant="outlined" color="primary" startIcon={<AppEmoji name="unsubscribe" onlyEmoji />}>
        Leave
      </Button>
    </AppBox>
  )
}
