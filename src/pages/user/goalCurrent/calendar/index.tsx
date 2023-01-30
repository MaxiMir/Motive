import { Badge, Box } from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useGoalContext } from 'entities/goal'
import { InputNotEditable } from './inputNotEditable'
import { getBorders } from './lib'
import { OpenPickerIcon } from './openPickerIcon'

const Emoji = dynamic(() => import('shared/ui/Emoji'))

interface CalendarProps {
  isLoading: boolean
  onChangeDate: (value: Date | null) => void
  shouldDisableDate: (value: Date) => boolean
}

export function Calendar({ isLoading, onChangeDate, shouldDisableDate }: CalendarProps) {
  const { formatMessage } = useIntl()
  const { day, calendar } = useGoalContext()
  const [min, max] = getBorders(calendar)
  const date = new Date(day.date)
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
