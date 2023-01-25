import { Badge, Box } from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dynamic from 'next/dynamic'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import InputNotEditable from './components/InputNotEditable'
import OpenPickerIcon from './components/OpenPickerIcon'
import { getBorders } from './helper'
import { useMessages } from './hooks/useMessages'

const Emoji = dynamic(() => import('@shared/ui/Emoji'))

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
        components={{ OpenPickerIcon }}
        InputProps={{
          readOnly: true,
          endAdornment: <OpenPickerIcon />,
        }}
        renderInput={InputNotEditable}
        renderDay={(_, _value, { key, disabled, ...pickerProps }) => (
          <Badge
            overlap="circular"
            badgeContent={disabled ? undefined : <Emoji name="task" onlyEmoji />}
            key={key}
          >
            <PickersDay {...pickerProps} disabled={disabled} />
          </Badge>
        )}
        onChange={onChangeDate}
      />
    </Box>
  )
}

export default Calendar
