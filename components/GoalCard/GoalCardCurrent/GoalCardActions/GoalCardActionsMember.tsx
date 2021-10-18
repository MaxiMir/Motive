import { useMemo } from 'react'
import { Button } from '@material-ui/core'
import { GoalCharacteristicsWithUsers, MainCharacteristic, Client, Role } from 'dto'
import CharacteristicCard from 'components/CharacteristicCard'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'

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
        {(['motivation', 'creativity', 'support'] as MainCharacteristic[]).map((characteristic) => (
          <CharacteristicCard
            type="action"
            dayId={dayId}
            characteristic={characteristic}
            key={characteristic}
            active={activeMap[characteristic]}
            onSet={onSetAction}
          />
        ))}
      </AppBox>
      <Button variant="outlined" color="primary" startIcon={<AppEmoji name="unsubscribe" onlyEmoji />}>
        Leave
      </Button>
    </AppBox>
  )
}
