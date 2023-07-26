import { Badge, Button } from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useIntl } from 'react-intl'
import { CalendarDto } from 'shared/api'
import { useFormatDate, useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import { getBorders } from './lib'

interface CalendarProps {
  dayDate: string
  calendar: CalendarDto[]
  isLoading: boolean
  shouldDisableDate: (value: Date) => boolean
  onChangeDate: (value: Date | null) => void
}

export function Calendar({
  dayDate,
  calendar,
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
      renderInput={({ inputRef }) => (
        <Button
          ref={inputRef}
          disabled={isLoading || open}
          color="inherit"
          endIcon={<Icon name="calendar_month" color="yellow" />}
          onClick={toggle}
        >
          {formattedDate}
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
