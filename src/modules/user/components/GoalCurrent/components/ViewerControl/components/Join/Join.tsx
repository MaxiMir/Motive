import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import useClient from '@hooks/useClient'
import useOpenSignIn from '@hooks/useOpenSignIn'
import AppEmoji from '@ui/AppEmoji'
import { useMessages } from './hooks/useMessages'

const ModalJoin = dynamic(() => import('./components/ModalJoin'))

function Join() {
  const messages = useMessages()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen(!open)

  const onClick = () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    toggleModal()
  }

  return (
    <>
      <Button variant="outlined" color="primary" startIcon={<AppEmoji name="join" onlyEmoji />} onClick={onClick}>
        {messages.buttonText}
      </Button>
      {open && <ModalJoin onClose={toggleModal} />}
    </>
  )
}

export default Join
