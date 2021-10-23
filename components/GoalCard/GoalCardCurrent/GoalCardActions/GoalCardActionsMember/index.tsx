import { useMemo } from 'react'
import { Button } from '@material-ui/core'
import { GoalCharacteristicsWithUsers, MainCharacteristic, Client, Role } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import GoalCardActionsMemberDefault from './GoalCardActionsMemberDefault'
import GoalCardActionsMemberSupport from './GoalCardActionsMemberSupport'

export interface GoalCardActionsMemberProps {
  role: Role
  dayId: string
  characteristics: GoalCharacteristicsWithUsers
  client: Client
  onSetAction: (characteristic: MainCharacteristic, increase: boolean) => void
}

export default function GoalCardActionsMember({
  dayId,
  characteristics,
  client,
  onSetAction,
}: GoalCardActionsMemberProps): JSX.Element {
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
          <GoalCardActionsMemberDefault
            dayId={dayId}
            characteristic={characteristic}
            key={characteristic}
            active={activeMap[characteristic]}
            onSet={onSetAction}
          />
        ))}
        <GoalCardActionsMemberSupport
          dayId={dayId}
          characteristic="support"
          active={activeMap.support}
          onSet={onSetAction}
        />
      </AppBox>
      <Button variant="outlined" color="primary" startIcon={<AppEmoji name="unsubscribe" onlyEmoji />}>
        Leave
      </Button>
    </AppBox>
  )
}
