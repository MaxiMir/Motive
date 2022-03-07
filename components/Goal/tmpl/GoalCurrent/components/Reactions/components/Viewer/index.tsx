import { Button } from '@material-ui/core'
import { UserBaseDto, GoalDto, DayCharacteristicName } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import ReactionWithSend from './components/ReactionWithSend'
import ReactionSupport from './components/ReactionSupport'

export interface ViewerProps {
  goal: GoalDto
  owner: UserBaseDto
  isPageOwner: boolean
}

export default function Viewer({ goal, owner, isPageOwner }: ViewerProps): JSX.Element {
  return (
    <AppBox justifyContent="space-between">
      <AppBox spacing={1}>
        {(['motivation', 'creativity'] as DayCharacteristicName[]).map((name) => (
          <ReactionWithSend goal={goal} name={name} key={name} />
        ))}
        <ReactionSupport goal={goal} owner={owner} />
      </AppBox>
      <Button
        variant="outlined"
        color={isPageOwner ? 'primary' : 'secondary'}
        startIcon={<AppEmoji name={isPageOwner ? 'unsubscribe' : 'subscribe'} onlyEmoji />}
      >
        {isPageOwner ? 'Leave' : 'Join'}
      </Button>
    </AppBox>
  )
}
