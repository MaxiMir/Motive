import { Box, Badge, Divider, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PickersDay } from '@mui/x-date-pickers'
import { styled } from '@mui/system'
import { GoalDto } from 'dto'
import useDebounceCb from 'hooks/useDebounceCb'
import useLocale from 'hooks/useLocale'
import AppIconButton from 'components/UI/AppIconButton'
import AppEmoji from 'components/UI/AppEmoji'
import { getCalendarInfo, getDateKey, getDatesMap } from './helper'
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
  const { prevDay, nextDay } = i18n[locale]
  const datesMap = getDatesMap(day, calendar)
  const { dates, prev, next, min, max } = getCalendarInfo(datesMap, day.date)

  const onClickArrow = (value: string) => {
    onChangeDebounce(datesMap[value])
  }

  const getDateValue = (value: Date) => {
    const dateKey = getDateKey(value)

    if (!dateKey || !datesMap[dateKey]) return null

    return datesMap[dateKey]
  }

  const onChangeDate = (value: Date | null) => {
    if (!value || +value === +date) return

    const dateValue = getDateValue(value)

    if (!dateValue) return

    onChangeDebounce(dateValue)
  }

  const shouldDisableDate = (value: Date) => {
    if (!value) return true

    const formattedCheckedDate = getDateKey(value)

    return !dates.some((d) => d === formattedCheckedDate)
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
        inputFormat="MM/dd/yyyy"
        views={['day']}
        value={date}
        disabled={isLoading}
        shouldDisableDate={shouldDisableDate}
        minDate={min}
        maxDate={max}
        renderDay={(_, _value, DayComponentProps) => (
          <Badge
            key={DayComponentProps.key}
            overlap="circular"
            badgeContent={!DayComponentProps.disabled ? <AppEmoji name="task" onlyEmoji /> : undefined}
          >
            <PickersDay {...DayComponentProps} />
          </Badge>
        )}
        renderInput={(params) => (
          <TextField
            size="small"
            {...params}
            error={params.inputProps?.value && !getDateValue(params.inputProps.value)}
            sx={{ width: 165 }}
          />
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
