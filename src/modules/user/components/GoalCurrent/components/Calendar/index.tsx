import { useIntl } from 'react-intl'
import { Box, Badge, Divider, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PickersDay } from '@mui/x-date-pickers'
import { styled } from '@mui/system'
import { GoalDto } from '@dto'
import useDebounceCb from '@hooks/useDebounceCb'
import AppIconButton from '@ui/AppIconButton'
import AppEmoji from '@ui/AppEmoji'
import { getBorders, getToggleDates, partialGetDateKey } from './helper'
import { useChangeDay } from './hook'

interface CalendarProps {
  goal: GoalDto
}

export default function Calendar({ goal }: CalendarProps) {
  const { id, day, calendar } = goal
  const { formatMessage } = useIntl()
  const date = new Date(day.date)
  const { isLoading, mutate } = useChangeDay(id)
  const onChangeDebounce = useDebounceCb(mutate, 1000)
  const format = formatMessage({ id: 'common.format' })
  const prevDayTitle = formatMessage({ id: 'common.prev-day' })
  const nextDayTitle = formatMessage({ id: 'common.next-day' })
  const getDateKey = partialGetDateKey(format)
  const dateMap = getDateMap()
  const dates = Object.keys(dateMap)
  const dateKey = getDateKey(day.date)
  const [prev, next] = getToggleDates(dates, dateKey)
  const [min, max] = getBorders(calendar)

  const onClickArrow = (value: string) => onChangeDebounce(dateMap[value])

  const onChangeDate = (value: Date | null) => {
    const invalidDate = Number.isNaN(value?.getTime())

    if (!value || +value === +date || invalidDate) return

    const newDateKey = getDateKey(value)

    if (!newDateKey || !dateMap[newDateKey]) return

    onChangeDebounce(dateMap[newDateKey])
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
    <Box display="flex" justifyContent="space-between" alignItems="center" position="relative" gap={2}>
      <PartDivider light sx={{ flex: 1 }} />
      <AppIconButton
        id={`prev-${id}`}
        size="small"
        name="chevron_left"
        title={prevDayTitle}
        aria-label={prevDayTitle}
        disabled={isLoading || !prev}
        onClick={() => onClickArrow(prev)}
      />
      <DatePicker
        inputFormat={format}
        views={['day']}
        value={date}
        disabled={isLoading}
        shouldDisableDate={shouldDisableDate}
        minDate={min}
        maxDate={max}
        renderDay={(_, _value, dayComponentProps) => (
          <Badge
            overlap="circular"
            badgeContent={!dayComponentProps.disabled ? <AppEmoji name="task" onlyEmoji /> : undefined}
            key={dayComponentProps.key}
          >
            <PickersDay {...dayComponentProps} />
          </Badge>
        )}
        renderInput={(params) => (
          <TextField size="small" {...params} error={!dates.includes(params.inputProps?.value)} sx={{ width: 165 }} />
        )}
        onChange={onChangeDate}
      />
      <AppIconButton
        id={`next-${id}`}
        size="small"
        name="navigate_next"
        title={nextDayTitle}
        aria-label={nextDayTitle}
        disabled={isLoading || !next}
        onClick={() => onClickArrow(next)}
      />
      <PartDivider light />
    </Box>
  )
}

const PartDivider = styled(Divider)({
  flex: 1,
})
