import { useState } from 'react'
import { Button, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
// import { KeyboardDatePicker } from '@material-ui/pickers'
// import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import useDebounceCb from 'hooks/useDebounceCb'
import AppBox from 'components/UI/AppBox'
import AppIconButton from 'components/UI/AppIconButton'
import { getCalendarInfo, getDateKey } from './helper'
import { useChangeDay } from './hook'

interface CalendarProps {
  goalId: number
  current: string
  datesMap: Record<string, number>
}

export default function Calendar({ goalId, datesMap, current }: CalendarProps): JSX.Element {
  const classes = useStyles()
  const dates = Object.keys(datesMap)
  const date = new Date(current)
  const [open, setOpen] = useState(false)
  const { isLoading, mutate } = useChangeDay(goalId)
  const onChangeDayWithDebounce = useDebounceCb(mutate, 1000)
  const { formattedValue, prevValue, nextValue } = getCalendarInfo(dates, date)

  const onClickArrow = (newDate: string) => {
    onChangeDayWithDebounce(datesMap[newDate])
  }

  const onChange = (newDate: Date) => {
    mutate(datesMap[getDateKey(newDate)])
  }

  const checkShouldDisableDate = (checkedDate: any) => {
    if (!checkedDate) {
      return false
    }

    const formattedCheckedDate = getDateKey(checkedDate)

    return !dates.some((d) => d === formattedCheckedDate)
  }

  const toggleModal = () => setOpen(!open)

  return (
    <AppBox justifyContent="space-between" alignItems="center" gap={2}>
      <Divider light className={classes.divider} />
      <AppIconButton
        size="small"
        name="chevron_left"
        disabled={isLoading || !prevValue}
        onClick={() => onClickArrow(prevValue)}
      />
      {/*<KeyboardDatePicker*/}
      {/*  variant="dialog"*/}
      {/*  format="MM/dd/yy"*/}
      {/*  open={open}*/}
      {/*  value={date}*/}
      {/*  shouldDisableDate={checkShouldDisableDate}*/}
      {/*  TextFieldComponent={() => (*/}
      {/*    <Button aria-label="select a goal date" onClick={toggleModal}>*/}
      {/*      {formattedValue}*/}
      {/*    </Button>*/}
      {/*  )}*/}
      {/*  onClick={toggleModal}*/}
      {/*  onChange={(newDate) => newDate && onChange(newDate)}*/}
      {/*  onClose={toggleModal}*/}
      {/*/>*/}
      <AppIconButton
        id={`next-${goalId}`}
        size="small"
        name="navigate_next"
        disabled={isLoading || !nextValue}
        onClick={() => onClickArrow(nextValue)}
      />
      <Divider light className={classes.divider} />
    </AppBox>
  )
}

const useStyles = makeStyles({
  divider: {
    flex: 1,
  },
})
