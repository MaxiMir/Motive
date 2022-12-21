import dynamic from 'next/dynamic'
import { Badge, Box } from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks'
import { useMessages } from './hooks/useMessages'
import { getBorders } from './helper'
import InputNotEditable from './components/InputNotEditable'

const AppEmoji = dynamic(() => import('@ui/AppEmoji'))

interface CalendarProps {
  isLoading: boolean
  onChangeDate: (value: Date | null) => void
  shouldDisableDate: (value: Date) => boolean
}

function Calendar({ isLoading, onChangeDate, shouldDisableDate }: CalendarProps) {
  const messages = useMessages()
  const { day, calendar } = useGoalContext()
  const [min, max] = getBorders(calendar)
  const date = new Date(day.date)

  return (
    <Box maxWidth={160}>
      <DatePicker
        inputFormat={messages.inputFormat}
        views={['day']}
        value={date}
        disabled={isLoading}
        shouldDisableDate={shouldDisableDate}
        minDate={min}
        maxDate={max}
        closeOnSelect
        onChange={onChangeDate}
        renderInput={InputNotEditable}
        renderDay={(_, _value, { key, disabled, ...pickerProps }) => (
          <Badge overlap="circular" badgeContent={disabled ? undefined : <AppEmoji name="task" onlyEmoji />} key={key}>
            <PickersDay {...pickerProps} disabled={disabled} />
          </Badge>
        )}
      />
    </Box>
  )
}

export default Calendar
