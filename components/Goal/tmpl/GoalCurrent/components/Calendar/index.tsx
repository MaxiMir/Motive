import { useMemo, useState } from 'react'
import { Button, IconButton, makeStyles, createStyles } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import useDebounceCb from 'hooks/useDebounceCb'
import AppBox from 'components/UI/AppBox'
import AppIcon from 'components/UI/AppIcon'
import { getDateInfo, getDateKey } from './helper'

interface CalendarProps {
  goalId: number
  datesMap: Record<string, number>
  date: string
  isLoading: boolean
  onChangeDay: (id: number) => void
}

export default function Calendar({ goalId, datesMap, date, isLoading, onChangeDay }: CalendarProps): JSX.Element {
  const classes = useStyles()
  const dates = Object.keys(datesMap)
  const [open, setOpen] = useState(false)
  const { value, formattedValue, nextValue, prevValue } = useMemo(() => getDateInfo(dates, date), [date, dates])
  const onChangeDayWithDebounce = useDebounceCb(onChangeDay, 1000)

  const onClickArrow = (newDate: string) => {
    onChangeDayWithDebounce(datesMap[newDate])
  }

  const onChange = (newDate: Date) => {
    onChangeDay(datesMap[getDateKey(newDate)])
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
    <AppBox alignSelf="center" alignItems="center" spacing={1}>
      <IconButton className={classes.button} disabled={isLoading || !prevValue} onClick={() => onClickArrow(prevValue)}>
        <AppIcon name="chevron_left" />
      </IconButton>
      <KeyboardDatePicker
        variant="dialog"
        format="MM/dd/yy"
        open={open}
        value={value}
        shouldDisableDate={checkShouldDisableDate}
        TextFieldComponent={() => (
          <Button aria-label="Select a goal date" onClick={toggleModal}>
            {formattedValue}
          </Button>
        )}
        onClick={toggleModal}
        onChange={(newDate) => newDate && onChange(newDate)}
        onClose={toggleModal}
      />
      <IconButton
        id={`next-${goalId}`}
        className={classes.button}
        disabled={isLoading || !nextValue}
        onClick={() => onClickArrow(nextValue)}
      >
        <AppIcon name="chevron_right" />
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
