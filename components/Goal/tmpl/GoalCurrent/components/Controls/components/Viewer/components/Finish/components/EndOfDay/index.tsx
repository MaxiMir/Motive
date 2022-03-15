import { Button } from '@material-ui/core'
import { GoalDto, MemberDto } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'
import { checkOnDisabled } from './helper'
import { useSendEndOfDay } from './hook'

interface EndOfDayProps {
  goal: GoalDto
  clientMember: MemberDto
}

export default function EndOfDay({ goal, clientMember }: EndOfDayProps): JSX.Element {
  const { mutate } = useSendEndOfDay()
  const disabled = checkOnDisabled(clientMember)

  const onClick = () => {
    mutate()
  }

  return (
    <Button
      variant="outlined"
      color="secondary"
      disabled={disabled}
      startIcon={<AppEmoji name="finish" onlyEmoji />}
      onClick={onClick}
    >
      End of day
    </Button>
  )
}
