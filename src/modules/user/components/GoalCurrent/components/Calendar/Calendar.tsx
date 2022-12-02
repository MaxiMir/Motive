import { useIntl } from 'react-intl'
import { Badge } from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { GoalDto } from '@dto'
import AppEmoji from '@ui/AppEmoji'
import useChangeDay from './hooks/useChangeDay'
import { partialGetDateKey, getBorders } from './helper'
import Input from './components/Input'

interface CalendarProps {
  goal: GoalDto
}

function Calendar({ goal }: CalendarProps) {
  const { id, day, calendar } = goal
  const { formatMessage } = useIntl()
  const { isLoading, mutate } = useChangeDay(id)
  const format = formatMessage({ id: 'common.format' })
  const getDateKey = partialGetDateKey(format)
  const dateMap = getDateMap()
  const date = new Date(day.date)
  const dates = Object.keys(dateMap)
  const [min, max] = getBorders(calendar)

  const onChangeDate = (value: Date | null) => {
    if (!value || +value === +date) return

    const dateKey = getDateKey(value)

    if (!dateMap[dateKey]) return

    mutate(dateMap[dateKey])
  }

  const shouldDisableDate = (value: Date) => {
    const formattedCheckedDate = getDateKey(value)

    return !dates.includes(formattedCheckedDate)
  }

  function getDateMap() {
    if (!calendar) {
      return { [getDateKey(day.date)]: day.id }
    }

    return calendar?.reduce((acc, c) => ({ ...acc, [getDateKey(c.date)]: c.id }), {})
  }

  return (
    <DatePicker
      inputFormat={format}
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
