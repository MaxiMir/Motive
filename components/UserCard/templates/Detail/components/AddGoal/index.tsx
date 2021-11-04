import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Goal } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'

const Modal = dynamic(() => import('./components/Modal'))

interface AddGoalProps {
  onAdd: (goal: Goal) => void
}

export default function AddGoal({ onAdd }: AddGoalProps): JSX.Element {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const onClick = () => setOpen(true)

  const onClose = () => setOpen(false)

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
        startIcon={<AppEmoji name="goal" onlyEmoji />}
        onClick={onClick}
      >
        Create a new goal
      </Button>
      {open && <Modal onSuccess={onSuccess} onClose={onClose} />}
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
