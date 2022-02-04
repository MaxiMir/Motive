import { useMemo } from 'react'
import { Button } from '@material-ui/core'
import { DayCharacteristicDto, UserBaseDto, GoalDto, RoleDto, DayCharacteristicName } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import ReactionWithSend from './components/ReactionWithSend'
import ReactionSupport from './components/ReactionSupport'

export interface ViewerProps {
  role: RoleDto
  goal: GoalDto
  characteristic: DayCharacteristicDto | null
  owner: UserBaseDto
  client?: UserBaseDto
}

export default function Viewer({ role, goal, characteristic, owner, client }: ViewerProps): JSX.Element {
  const activeMap = useMemo(getActiveMap, [characteristic?.creativity, characteristic?.motivation, client])

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
        {(['motivation', 'creativity'] as DayCharacteristicName[]).map((name) => (
          <ReactionWithSend goal={goal} name={name} active={activeMap[name]} client={client} key={name} />
        ))}
        <ReactionSupport owner={owner} />
      </AppBox>
      <Button
        variant="outlined"
        color={role === 'MEMBER' ? 'primary' : 'secondary'}
        startIcon={<AppEmoji name={role === 'MEMBER' ? 'unsubscribe' : 'subscribe'} onlyEmoji />}
      >
        {role === 'MEMBER' ? 'Leave' : 'Join'}
      </Button>
    </AppBox>
  )
}
