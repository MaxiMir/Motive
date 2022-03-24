import { useState } from 'react'
import { Button, Divider, makeStyles } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
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

  const checkShouldDisableDate = (checkedDate: MaterialUiPickersDate) => {
    if (!checkedDate) {
      return false
    }

    const formattedCheckedDate = getDateKey(checkedDate)

    return !dates.some((d) => d === formattedCheckedDate)
  }

  const toggleModal = () => setOpen(!open)

  return (
    <AppBox justifyContent="space-between" alignItems="center" spacing={2}>
      <AppIconButton
        size="small"
        name="chevron_left"
        disabled={isLoading || !prevValue}
        onClick={() => onClickArrow(prevValue)}
      />
      <Divider className={classes.divider} />
      <KeyboardDatePicker
        variant="dialog"
        format="MM/dd/yy"
        open={open}
        value={date}
        shouldDisableDate={checkShouldDisableDate}
        TextFieldComponent={() => (
          <Button aria-label="select a goal date" onClick={toggleModal}>
            {formattedValue}
          </Button>
        )}
        onClick={toggleModal}
        onChange={(newDate) => newDate && onChange(newDate)}
        onClose={toggleModal}
      />
      <Divider className={classes.divider} />
      <AppIconButton
        id={`next-${goalId}`}
        size="small"
        name="navigate_next"
        disabled={isLoading || !nextValue}
        onClick={() => onClickArrow(nextValue)}
      />
    </AppBox>
  )
}

const useStyles = makeStyles({
  divider: {
    flex: 1,
  },
})
