import { Button } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'

export default function Repeat(): JSX.Element {
  // todo add hook
  return (
    <AppBox justifyContent="flex-end">
      <Button variant="outlined" color="secondary" startIcon={<AppEmoji name="members" onlyEmoji />}>
        Repeat
      </Button>
    </AppBox>
  )
}
