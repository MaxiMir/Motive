import { Button } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'

export default function OwnerWithFeedback(): JSX.Element {
  return (
    <AppBox justifyContent="space-between">
      <Button variant="outlined" color="primary" startIcon={<AppEmoji name="task" onlyEmoji />}>
        Add tasks
      </Button>
      <Button variant="outlined" color="secondary" startIcon={<AppEmoji name="cup" onlyEmoji />}>
        Complete
      </Button>
    </AppBox>
  )
}
