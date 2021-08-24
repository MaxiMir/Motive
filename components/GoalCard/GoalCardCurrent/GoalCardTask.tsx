import { Task } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppTypography from 'components/UI/AppTypography'

export default function GoalCardTask({ name }: Task): JSX.Element {
  return (
    <AppBox alignItems="center" spacing={1}>
      <AppEmoji name="task-current" variant="h6" />
      <AppTypography variant="subtitle1">{name}</AppTypography>
    </AppBox>
  )
}
