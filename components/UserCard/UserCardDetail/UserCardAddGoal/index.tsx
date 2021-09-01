import { useState } from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Goal } from 'dto'

const UserCardAddGoalModal = dynamic(() => import('./UserCardAddGoalModal'))
const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))

interface UserCardAddGoalProps {
  onAdd: (goal: Goal) => void
}

export default function UserCardAddGoal({ onAdd }: UserCardAddGoalProps): JSX.Element {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [withMessage, setWithMessage] = useState(false)

  const onSuccess = (goal: Goal) => {
    setOpen(false)
    setWithMessage(true)
    onAdd(goal)
  }

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color="secondary"
        className={classes.button}
        onClick={() => setOpen(true)}
      >
        💎 Create a new goal
      </Button>
      {open && <UserCardAddGoalModal onSuccess={onSuccess} onClose={() => setOpen(false)} />}
      {withMessage && (
        <AppSnackbar icon="💎" severity="success" autoHideDuration={3000} onClose={() => setWithMessage(false)}>
          The goal is successfully created
        </AppSnackbar>
      )}
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
