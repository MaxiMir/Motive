import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import useClient from '@hooks/useClient'
import useOpenSignIn from '@hooks/useOpenSignIn'
import useToggle from '@hooks/useToggle'
import AppEmoji from '@ui/AppEmoji'
import { useMessages } from './hooks/useMessages'

const ModalJoin = dynamic(() => import('./components/ModalJoin'))

function Join() {
  const messages = useMessages()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [open, toggle] = useToggle()

  const onClick = () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    toggle()
  }

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AppEmoji name="join" onlyEmoji />}
        onClick={onClick}
      >
        {messages.buttonText}
      </Button>
      {open && <ModalJoin onClose={toggle} />}
    </>
  )
}

export default Join
