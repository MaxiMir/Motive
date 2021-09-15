import React, { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { Button, IconButton } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { StepDate } from 'dto'
import useDebounceCb from 'hooks/useDebounceCb'
import AppBox from 'components/UI/AppBox'

interface GoalCardDateProps {
  id: string
  date: string
  stepDates: StepDate[]
  onChangeDate: (id: string) => void
}

const DATE_FORMAT = 'MM/dd/yy'

export default function GoalCardDate({ id, date, stepDates, onChangeDate }: GoalCardDateProps): JSX.Element {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(new Date(date))
  const formattedDate = format(value, 'MM/dd/yy')
  const dateISO = value.toISOString()
  const dateIndex = stepDates.findIndex((s) => s.date === dateISO)
  const prevDate = stepDates[dateIndex - 1]?.date
  const nextDate = stepDates[dateIndex + 1]?.date
  const formattedStepDates = useMemo(() => stepDates.map((s) => format(new Date(s.date), DATE_FORMAT)), [stepDates])
  const onChangeDateWithDebounce = useDebounceCb(onChangeDate, 1500)

  const onChange = (changedDate: string) => {
    setValue(new Date(changedDate))
    onChangeDateWithDebounce(id)
  }

  return (
    <AppBox alignSelf="center" alignItems="center" spacing={1}>
      <IconButton className={classes.button} disabled={!prevDate} onClick={() => onChange(prevDate)}>
        <span className="material-icons">chevron_left</span>
      </IconButton>
      <KeyboardDatePicker
        disableFuture
        variant="dialog"
        format="MM/dd/yy"
        open={open}
        value={value}
        shouldDisableDate={(pickerDate) => {
          const formattedPickerDateReset = format(pickerDate as Date, DATE_FORMAT)
          return !formattedStepDates.some((f) => f === formattedPickerDateReset)
        }}
        TextFieldComponent={() => (
          <Button aria-label="select a goal date" onClick={() => setOpen(true)}>
            {formattedDate}
          </Button>
        )}
        onClick={() => setOpen(true)}
        onChange={(newDate) => newDate && setValue(newDate)}
        onClose={() => setOpen(false)}
      />
      <IconButton className={classes.button} disabled={!nextDate} onClick={() => onChange(nextDate)}>
        <span className="material-icons">chevron_right</span>
      </IconButton>
    </AppBox>
  )
}

const useStyles = makeStyles({
  button: {
    color: '#99989D',
  },
})
