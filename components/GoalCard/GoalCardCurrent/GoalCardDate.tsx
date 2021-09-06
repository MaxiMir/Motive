import React, { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { format } from 'date-fns'
import { Button, IconButton } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardDatePicker } from '@material-ui/pickers'
import ROUTE from 'route'
import Axios from 'lib/axios'
import { GoalDatesResponse } from 'dto'
import useDebounceCb from 'hooks/useDebounceCb'
import AppBox from 'components/UI/AppBox'

interface GoalCardDateProps {
  id: string
  date: string
  onChangeDate: (id: string) => void
}

const queryFn = async (id: string) => await Axios.get(ROUTE.getGoalDates(id))

export default function GoalCardDate({ id, date, onChangeDate }: GoalCardDateProps): JSX.Element {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(new Date(date))
  const { data } = useQuery<GoalDatesResponse>(`goal-dates-${id}`, () => queryFn(id))
  const formattedDate = format(value, 'MM/dd/yy')
  const dateISO = value?.toISOString()
  const goals = data?.data
  const dateIndex = dateISO && goals?.findIndex((goal) => goal.date === dateISO)
  const prevDate = typeof dateIndex !== 'number' ? undefined : goals?.[dateIndex - 1]?.date
  const nextDate = typeof dateIndex !== 'number' ? undefined : goals?.[dateIndex + 1]?.date
  const goalsDate = useMemo(() => goals?.map((goal) => format(new Date(goal.date), 'MM/dd/yyyy')), [goals])
  const onChangeDateWithDebounce = useDebounceCb(onChangeDate, 1500)

  const onChange = (newDate: Date | null) => {
    newDate && setValue(newDate)
    onChangeDateWithDebounce(id)
  }

  return (
    <AppBox alignSelf="center" alignItems="center" spacing={1}>
      <IconButton
        className={classes.button}
        disabled={!prevDate}
        onClick={() => onChange(new Date(prevDate as string))}
      >
        <span className="material-icons">chevron_left</span>
      </IconButton>
      <KeyboardDatePicker
        disableFuture
        variant="dialog"
        format="MM/dd/yy"
        open={open}
        value={value}
        shouldDisableDate={(pickerDate) => {
          if (!pickerDate || !goalsDate) {
            return true
          }

          const pickerDateReset = format(pickerDate as Date, 'MM/dd/yy')

          return !goalsDate.some((goalDate) => goalDate === pickerDateReset)
        }}
        TextFieldComponent={() => (
          <Button aria-label="select a goal date" disabled={!goals} onClick={() => setOpen(true)}>
            {formattedDate}
          </Button>
        )}
        onClick={() => setOpen(true)}
        onChange={(newDate) => newDate && setValue(newDate)}
        onClose={() => setOpen(false)}
      />
      <IconButton
        className={classes.button}
        disabled={!nextDate}
        onClick={() => onChange(new Date(nextDate as string))}
      >
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
