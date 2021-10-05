import { useMemo } from 'react'
import { Button } from '@material-ui/core/'
import { GoalCharacteristicsWithUsers, MainCharacteristic, Client, Role } from 'dto'
import CharacteristicCard from 'components/CharacteristicCard'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'

export interface GoalCardActionsMemberProps {
  role: Role
  characteristics: GoalCharacteristicsWithUsers
  client: Client
}

export default function GoalCardActionsMember({ characteristics, client }: GoalCardActionsMemberProps): JSX.Element {
  const activeMap = useMemo(getActiveCharacteristicMap, [characteristics, client.id])

  function getActiveCharacteristicMap() {
    return (['motivation', 'creativity', 'support'] as MainCharacteristic[]).reduce(
      (acc, name: MainCharacteristic) => ({
        ...acc,
        [name]: characteristics[name].users.includes(client.id),
      }),
      {} as { [k in MainCharacteristic]: boolean },
    )
  }

  return (
    <AppBox justifyContent="space-between">
      <AppBox spacing={1}>
        {(['motivation', 'creativity', 'support'] as MainCharacteristic[]).map((name) => (
          <CharacteristicCard type="action" name={name} key={name} active={activeMap[name]} />
        ))}
      </AppBox>
      <Button variant="outlined" color="primary" startIcon={<AppEmoji name="unsubscribe" onlyEmoji />}>
        Leave
      </Button>
    </AppBox>
  )
}
