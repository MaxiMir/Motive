import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@material-ui/core'
import { GoalDto } from 'dto'
import useClient from 'hooks/useClient'
import useOpenSignIn from 'hooks/useOpenSignIn'
import AppEmoji from 'components/UI/AppEmoji'

const Modal = dynamic(() => import('components/Modal'))

interface JoinProps {
  goal: GoalDto
}

export default function Join({ goal }: JoinProps): JSX.Element {
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(!open)

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
        color="secondary"
        startIcon={<AppEmoji name="subscribe" onlyEmoji />}
        onClick={onClick}
      >
        Join
      </Button>
      {open && <Modal tmpl="subscribe" goal={goal} onClose={toggle} />}
    </>
  )
}
