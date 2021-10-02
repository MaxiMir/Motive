import { Button } from '@material-ui/core/'
import { MainCharacteristic } from 'dto'
import CharacteristicCard from 'components/CharacteristicCard'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import GoalCardActionsComplaint from './GoalCardActionsComplaint'

export default function GoalCardActionsMember(): JSX.Element {
  return (
    <AppBox justifyContent="space-between">
      <AppBox spacing={1}>
        {(['motivation', 'creativity', 'support'] as MainCharacteristic[]).map((name) => (
          <CharacteristicCard type="action" name={name} key={name} />
        ))}
        <GoalCardActionsComplaint />
      </AppBox>
      <Button variant="outlined" color="primary" startIcon={<AppEmoji name="unsubscribe" onlyEmoji />}>
        Leave
      </Button>
    </AppBox>
  )
}
