import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'

const Modal = dynamic(() => import('./components/Modal'))

export default function Owner(): JSX.Element {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(!open)

  return (
    <AppBox justifyContent="flex-end">
      <Button variant="outlined" color="secondary" startIcon={<AppEmoji name="finish" onlyEmoji />} onClick={toggle}>
        Finish the day
      </Button>
      {open && <Modal onClose={toggle} />}
    </AppBox>
  )
}