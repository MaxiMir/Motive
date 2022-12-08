import { Badge } from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import AppEmoji from '@ui/AppEmoji'
import { useMessages } from './hooks/useMessages'
import { getBorders } from './helper'
import Input from './components/Input'

interface CalendarProps {
  isLoading: boolean
  onChangeDate: (value: Date | null) => void
  shouldDisableDate: (value: Date) => boolean
}

function Calendar({ isLoading, onChangeDate, shouldDisableDate }: CalendarProps) {
  const { day, calendar } = useGoalContext()
  const messages = useMessages()
  const [min, max] = getBorders(calendar)
  const date = new Date(day.date)

  return (
    <DatePicker
      inputFormat={messages.inputFormat}
      views={['day']}
      value={date}
      disabled={isLoading}
      shouldDisableDate={shouldDisableDate}
      minDate={min}
      maxDate={max}
      onChange={onChangeDate}
      renderDay={(_, _value, dayComponentProps) => (
        <Badge
          overlap="circular"
          badgeContent={dayComponentProps.disabled ? undefined : <AppEmoji name="task" onlyEmoji />}
          key={dayComponentProps.key}
        >
          <PickersDay {...dayComponentProps} />
        </Badge>
      )}
      renderInput={Input}
    />
  )
}

export default Calendar
