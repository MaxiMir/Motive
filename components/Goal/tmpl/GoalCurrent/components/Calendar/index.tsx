import { Box, Badge, Divider, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PickersDay } from '@mui/x-date-pickers'
import { styled } from '@mui/system'
import { GoalDto } from 'dto'
import useDebounceCb from 'hooks/useDebounceCb'
import useLocale from 'hooks/useLocale'
import AppIconButton from 'components/UI/AppIconButton'
import AppEmoji from 'components/UI/AppEmoji'
import { getBorders, getToggleDates, partialGetDateKey } from './helper'
import { useChangeDay } from './hook'
import i18n from './i18n'

interface CalendarProps {
  goal: GoalDto
}

export default function Calendar({ goal }: CalendarProps): JSX.Element {
  const { id, day, calendar } = goal
  const { locale } = useLocale()
  const date = new Date(day.date)
  const { isLoading, mutate } = useChangeDay(id)
  const onChangeDebounce = useDebounceCb(mutate, 1000)
  const { format, prevDay, nextDay } = i18n[locale]
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
        size="small"
        name="chevron_left"
        title={prevDay}
        aria-label={prevDay}
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
        renderDay={(_, _value, DayComponentProps) => (
          <Badge
            overlap="circular"
            badgeContent={!DayComponentProps.disabled ? <AppEmoji name="task" onlyEmoji /> : undefined}
            key={DayComponentProps.key}
          >
            <PickersDay {...DayComponentProps} />
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
        title={nextDay}
        aria-label={nextDay}
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
