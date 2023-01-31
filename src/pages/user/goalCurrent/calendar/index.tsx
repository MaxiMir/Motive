import { Badge, Box } from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useIntl } from 'react-intl'
import { CalendarDto } from 'shared/api'
import { InputNotEditable } from './inputNotEditable'
import { getBorders } from './lib'
import { OpenPickerIcon } from './openPickerIcon'

interface CalendarProps {
  dayDate: string
  calendar: CalendarDto[]
  isLoading: boolean
  onChangeDate: (value: Date | null) => void
  shouldDisableDate: (value: Date) => boolean
}

export function Calendar({
  dayDate,
  calendar,
  isLoading,
  onChangeDate,
  shouldDisableDate,
}: CalendarProps) {
  const { formatMessage } = useIntl()
  const [min, max] = getBorders(calendar)
  const date = new Date(dayDate)
  const inputFormat = formatMessage({ id: 'common.format' })

  return (
    <Box maxWidth={160}>
      <DatePicker
        inputFormat={inputFormat}
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
          <Badge overlap="circular" badgeContent={disabled ? undefined : '📌'} key={key}>
            <PickersDay {...pickerProps} disabled={disabled} />
          </Badge>
        )}
        onChange={onChangeDate}
      />
    </Box>
  )
}
