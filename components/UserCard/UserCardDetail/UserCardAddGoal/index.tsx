import { useState } from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Goal } from 'dto'

const UserCardAddGoalModal = dynamic(() => import('./UserCardAddGoalModal'))

interface UserCardAddGoalProps {
  onAdd: (goal: Goal) => void
}

export default function UserCardAddGoal({ onAdd }: UserCardAddGoalProps): JSX.Element {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const onSuccess = (goal: Goal) => {
    onAdd(goal)
    setOpen(false)
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
