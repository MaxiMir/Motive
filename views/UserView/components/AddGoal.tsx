import { useState } from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'

const Modal = dynamic(() => import('components/Modal'))

export default function AddGoal(): JSX.Element {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color="secondary"
        id="create"
        className={classes.button}
        startIcon={<AppEmoji name="goal" onlyEmoji />}
        onClick={toggleModal}
      >
        Create a new goal
      </Button>
      {open && <Modal tmpl="goal" onClose={toggleModal} />}
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
