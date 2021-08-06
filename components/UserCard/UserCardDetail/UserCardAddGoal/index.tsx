import { useState } from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const UserCardAddGoalModal = dynamic(() => import('./UserCardAddGoalModal'))
const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))

export default function UserCardAddGoal(): JSX.Element {
  const [open, setOpen] = useState(false)
  const [withMessage, setWithMessage] = useState(false)
  const classes = useStyles()

  const onCreate = () => {
    onClose()
    setWithMessage(true)
  }

  const onClose = () => setOpen(false)

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
      {open && <UserCardAddGoalModal onCreate={onCreate} onClose={onClose} />}
      {withMessage && (
        <AppSnackbar severity="success" autoHideDuration={3000} onClose={() => setWithMessage(false)}>
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
