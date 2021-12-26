import { useMemo } from 'react'
import produce from 'immer'
import { Button } from '@material-ui/core'
import { MainCharacteristicName, DayCharacteristicDto, UserBaseDto, GoalDto, RoleDto } from 'dto'
import { useMutateGoals } from 'views/User/hook'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import ReactionWithSend from './components/ReactionWithSend'
import Reaction from './components/Reaction'

export interface ViewerProps {
  dayId: number
  role: RoleDto
  goal: GoalDto
  characteristic: DayCharacteristicDto | null
  owner: UserBaseDto
  client: UserBaseDto
}

export default function Viewer({ role, dayId, goal, characteristic, owner, client }: ViewerProps): JSX.Element {
  const [goals, mutateGoals] = useMutateGoals()
  const activeMap = useMemo(getActiveMap, [characteristic?.creativity, characteristic?.motivation, client])

  const onSet = (value: MainCharacteristicName, increase: boolean) =>
    mutateGoals(
      produce(goals, (draft: GoalDto[]) => {
        draft[draft.findIndex((g) => g.id === goal.id)].characteristic[value] += increase ? 1 : -1
      }),
    )

  function getActiveMap() {
    return {
      motivation: Boolean(client && characteristic?.motivation?.includes(client.id)),
      creativity: Boolean(client && characteristic?.creativity?.includes(client.id)),
      support: false,
    }
  }

  return (
    <AppBox justifyContent="space-between">
      <AppBox spacing={1}>
        {(['motivation', 'creativity'] as MainCharacteristicName[]).map((name) => (
          <ReactionWithSend dayId={dayId} name={name} active={activeMap[name]} key={name} onSet={onSet} />
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
