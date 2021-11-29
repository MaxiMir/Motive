import { Button } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'

export default function Owner(): JSX.Element {
  return (
    <AppBox justifyContent="flex-end">
      <Button variant="outlined" color="secondary" startIcon={<AppEmoji name="finish" onlyEmoji />}>
        Finish the day
      </Button>
    </AppBox>
  )
}
