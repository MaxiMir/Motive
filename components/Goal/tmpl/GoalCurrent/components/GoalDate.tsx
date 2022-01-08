import React, { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { Button, createStyles, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { toISODateWithZeroTime } from 'helpers/date'
import useDebounceCb from 'hooks/useDebounceCb'
import AppBox from 'components/UI/AppBox'

interface DateProps {
  datesMap: Record<string, number>
  date: string
  onChangeDate: (id: number) => void
}

export default function GoalDate({ datesMap, date, onChangeDate }: DateProps): JSX.Element {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(new Date(date))
  const formattedDate = format(value, 'MM/dd/yy')
  const dates = Object.keys(datesMap)
  const dateIndex = useMemo(getDateIndex, [dates, value])
  const [prevDate, nextDate] = [dates[dateIndex - 1], dates[dateIndex + 1]]
  const onChangeDateWithDebounce = useDebounceCb(onChangeDate, 1000)

  const onClickArrow = (newDate: string) => {
    setValue(new Date(newDate))
    onChangeDateWithDebounce(datesMap[newDate])
  }

  const onChange = (newDate: Date) => {
    setValue(newDate)
    onChangeDate(datesMap[toISODateWithZeroTime(newDate)])
  }

  const checkShouldDisableDate = (checkedDate: MaterialUiPickersDate) => {
    if (!checkedDate) {
      return false
    }

    const formattedCheckedDate = toISODateWithZeroTime(checkedDate)
    return !dates.some((d) => d === formattedCheckedDate)
  }

  const toggle = () => setOpen(!open)

  function getDateIndex() {
    return dates.findIndex((d) => d === value.toISOString())
  }

  return (
    <AppBox alignSelf="center" alignItems="center" spacing={1}>
      <IconButton className={classes.button} disabled={!prevDate} onClick={() => onClickArrow(prevDate)}>
        <span className="material-icons">chevron_left</span>
      </IconButton>
      <KeyboardDatePicker
        variant="dialog"
        format="MM/dd/yy"
        open={open}
        value={value}
        shouldDisableDate={checkShouldDisableDate}
        TextFieldComponent={() => (
          <Button aria-label="select a goal date" onClick={toggle}>
            {formattedDate}
          </Button>
        )}
        onClick={toggle}
        onChange={(newDate) => newDate && onChange(newDate)}
        onClose={toggle}
      />
      <IconButton className={classes.button} disabled={!nextDate} onClick={() => onClickArrow(nextDate)}>
        <span className="material-icons">chevron_right</span>
      </IconButton>
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      color: theme.text.silent,
    },
  }),
)
