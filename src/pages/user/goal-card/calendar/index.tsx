import { Badge, Button } from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useIntl } from 'react-intl'
import { CalendarDto } from 'shared/api'
import { useFormatDate, useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/icon'
import { getBorders } from './lib'

interface CalendarProps {
  dayDate: string
  calendar: CalendarDto
  runningDays: number
  isLoading: boolean
  shouldDisableDate: (value: Date) => boolean
  onChangeDate: (value: Date | null) => void
}

export function Calendar({
  dayDate,
  calendar,
  runningDays,
  isLoading,
  shouldDisableDate,
  onChangeDate,
}: CalendarProps) {
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const formatDate = useFormatDate()
  const [min, max] = getBorders(calendar)
  const date = new Date(dayDate)
  const inputFormat = formatMessage({ id: 'common.format' })
  const day = formatMessage({ id: 'common.day' })
  const formattedDate = formatDate(dayDate, { day: 'numeric', month: 'long' })

  return (
    <DatePicker
      open={open}
      onOpen={toggle}
      onClose={toggle}
      inputFormat={inputFormat}
      views={['day']}
      value={date}
      disabled={isLoading}
      shouldDisableDate={shouldDisableDate}
      minDate={min}
      maxDate={max}
      closeOnSelect
      showToolbar={false}
      renderInput={({ inputRef }) => (
        <Button
          ref={inputRef}
          disabled={isLoading || open}
          endIcon={<Icon name="calendar_month" color="zen.silent" />}
          sx={{ color: 'zen.silent' }}
          onClick={toggle}
        >
          {formattedDate} ({runningDays} {day})
        </Button>
      )}
      renderDay={(_, _value, { key, disabled, ...pickerProps }) => (
        <Badge overlap="circular" badgeContent={disabled ? undefined : '📌'} key={key}>
          <PickersDay {...pickerProps} disabled={disabled} />
        </Badge>
      )}
      onChange={onChangeDate}
    />
  )
}
