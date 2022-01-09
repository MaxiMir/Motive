import { useState } from 'react'
import dynamic from 'next/dynamic'
import produce from 'immer'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { GoalDto } from 'dto'
import useSnackbar from 'hooks/useSnackbar'
import { useMutateGoals } from 'views/User/hook'
import { scrollToElem } from 'helpers/dom'
import AppEmoji from 'components/UI/AppEmoji'

const Modal = dynamic(() => import('./components/Modal'))

export default function AddGoal(): JSX.Element {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [goals, mutateGoals] = useMutateGoals()

  const toggle = () => setOpen(!open)

  const onSuccess = (goal: GoalDto) => {
    mutateGoals(
      produce(goals, (draft: GoalDto[]) => {
        draft.push(goal)
      }),
    )
    enqueueSnackbar({ message: 'The goal is successfully created', severity: 'success', icon: 'goal' })
    toggle()
    setTimeout(() => scrollToElem(`goal-${goal.id}`), 500)
  }

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color="secondary"
        className={classes.button}
        startIcon={<AppEmoji name="goal" onlyEmoji />}
        onClick={toggle}
      >
        Create a new goal
      </Button>
      {open && <Modal onSuccess={onSuccess} onClose={toggle} />}
    </>
  )
}

const useStyles = makeStyles({
  button: {
    width: 200,
    borderRadius: 5,
    border: '1px solid #4DA0EC',
    color: '#4DA0EC',

    '&:hover': {
      border: '1px solid #4DA0EC',
    },
  },
})
