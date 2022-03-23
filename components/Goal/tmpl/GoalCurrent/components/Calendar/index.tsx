import { Button, createStyles, makeStyles, Paper } from '@material-ui/core'
import { Calendar as MuiCalendar } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import useDebounceCb from 'hooks/useDebounceCb'
import AppBox from 'components/UI/AppBox'
import AppIcon from 'components/UI/AppIcon'
import { getBorders, getDateKey } from './helper'
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
  const { isLoading, mutate } = useChangeDay(goalId)
  const onChangeDayWithDebounce = useDebounceCb(mutate, 1000)
  const [prevValue, nextValue] = getBorders(dates, date)

  const onChange = (newDate: Date) => {
    mutate(datesMap[getDateKey(newDate)])
  }

  const onClickArrow = (newDate: string) => {
    onChangeDayWithDebounce(datesMap[newDate])
  }

  const checkShouldDisableDate = (checkedDate: MaterialUiPickersDate) => {
    if (!checkedDate) {
      return false
    }

    const formattedCheckedDate = getDateKey(checkedDate)

    return !dates.some((d) => d === formattedCheckedDate)
  }

  return (
    <AppBox flexDirection="column" alignItems="center" spacing={2} flex={1}>
      <Paper className={classes.paper}>
        <MuiCalendar
          date={date}
          shouldDisableDate={checkShouldDisableDate}
          onChange={(newDate) => newDate && onChange(newDate)}
        />
      </Paper>
      <AppBox spacing={4}>
        <Button
          size="small"
          startIcon={<AppIcon name="chevron_left" />}
          className={classes.button}
          disabled={isLoading || !prevValue}
          onClick={() => onClickArrow(prevValue)}
        >
          prev day
        </Button>
        <Button
          id={`next-${goalId}`}
          size="small"
          endIcon={<AppIcon name="chevron_right" />}
          className={classes.button}
          disabled={isLoading || !nextValue}
          onClick={() => onClickArrow(nextValue)}
        >
          next day
        </Button>
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      overflow: 'hidden',
    },
    button: {
      color: theme.text.silent,
    },
  }),
)
