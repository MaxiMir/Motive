import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@material-ui/core'
import { GoalDto } from 'dto'
import useClient from 'hooks/useClient'
import useOpenSignIn from 'hooks/useOpenSignIn'
import AppEmoji from 'components/UI/AppEmoji'

const Modal = dynamic(() => import('components/Modal'))

export interface MembershipJoinProps {
  tmpl: 'join'
  goal: GoalDto
}

export default function MembershipJoin({ goal }: MembershipJoinProps): JSX.Element {
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
      <Button variant="outlined" color="secondary" startIcon={<AppEmoji name="join" onlyEmoji />} onClick={onClick}>
        Join
      </Button>
      {open && <Modal tmpl="join" goal={goal} onClose={toggleModal} />}
    </>
  )
}
