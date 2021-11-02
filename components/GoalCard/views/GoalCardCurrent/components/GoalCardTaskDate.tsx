import { format } from 'date-fns'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

interface GoalCardTaskDateProps {
  date: string
}

export default function GoalCardTaskDate({ date }: GoalCardTaskDateProps): JSX.Element {
  return (
    <AppBox alignItems="center" color="#99989D" spacing={1} marginLeft={3}>
      <span className="material-icons">schedule</span>
      <AppTypography>{format(new Date(date), 'hh:mm')}</AppTypography>
    </AppBox>
  )
}
