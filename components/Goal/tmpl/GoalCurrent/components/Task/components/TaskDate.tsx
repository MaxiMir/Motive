import { format } from 'date-fns'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppIcon from 'components/UI/AppIcon'

interface TaskDateProps {
  date: string
}

export default function TaskDate({ date }: TaskDateProps): JSX.Element {
  return (
    <AppBox alignItems="center" color="#99989D" spacing={1} marginLeft={3}>
      <AppIcon name="schedule" />
      <AppTypography>{format(new Date(date), 'hh:mm')}</AppTypography>
    </AppBox>
  )
}
