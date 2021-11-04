import { useMemo } from 'react'
import { Button } from '@material-ui/core'
import { GoalCharacteristicsWithUsers, MainCharacteristic, Client, Role } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import WithSend from './components/WithSend'
import Support from './components/Support'

export interface MemberProps {
  role: Role
  dayId: string
  characteristics: GoalCharacteristicsWithUsers
  client: Client
  onSetAction: (characteristic: MainCharacteristic, increase: boolean) => void
}

export default function Member({ dayId, characteristics, client, onSetAction }: MemberProps): JSX.Element {
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
          <WithSend
            dayId={dayId}
            characteristic={characteristic}
            key={characteristic}
            active={activeMap[characteristic]}
            onSet={onSetAction}
          />
        ))}
        <Support characteristic="support" active={activeMap.support} />
      </AppBox>
      <Button variant="outlined" color="primary" startIcon={<AppEmoji name="unsubscribe" onlyEmoji />}>
        Leave
      </Button>
    </AppBox>
  )
}
