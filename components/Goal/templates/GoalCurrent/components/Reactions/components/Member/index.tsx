import { useMemo } from 'react'
import { Button } from '@material-ui/core'
import { GoalCharacteristicsWithUsers, MainCharacteristic, Client, Role, UserBase } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import ReactionWithSend from './components/ReactionWithSend'
import Reaction from './components/Reaction'

export interface MemberProps {
  role: Role
  dayId: string
  characteristics: GoalCharacteristicsWithUsers
  client: Client
  owner: UserBase
  onSetAction: (characteristic: MainCharacteristic, increase: boolean) => void
}

export default function Member({ dayId, characteristics, client, owner, onSetAction }: MemberProps): JSX.Element {
  const activeMap = useMemo(getActiveCharacteristicMap, [characteristics, client.id])

  function getActiveCharacteristicMap() {
    return (['motivation', 'creativity', 'support'] as MainCharacteristic[]).reduce(
      (acc, type: MainCharacteristic) => ({
        ...acc,
        [type]: characteristics[type].users.includes(client.id),
      }),
      {} as { [k in MainCharacteristic]: boolean },
    )
  }

  return (
    <AppBox justifyContent="space-between">
      <AppBox spacing={1}>
        {(['motivation', 'creativity'] as MainCharacteristic[]).map((characteristic) => (
          <ReactionWithSend
            dayId={dayId}
            characteristic={characteristic}
            active={activeMap[characteristic]}
            key={characteristic}
            onSet={onSetAction}
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
