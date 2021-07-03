import { useState } from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'

const UserCardAddGoalModal = dynamic(() => import('./UserCardAddGoalModal'))

const UserCardAddGoal = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  return (
    <>
      <Button
        startIcon={<AppEmoji name="goal" variant="h6" />}
        variant="outlined"
        size="small"
        color="secondary"
        className={classes.button}
        onClick={() => setOpen(true)}
      >
        Create a new goal
      </Button>
      {open && <UserCardAddGoalModal onClose={() => setOpen(false)} />}
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

export default UserCardAddGoal
