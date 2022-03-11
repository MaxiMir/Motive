import { useState } from 'react'
import dynamic from 'next/dynamic'
import { GoalDto, UserBaseDto } from 'dto'
import useClient from 'hooks/useClient'
import useOpenSignIn from 'hooks/useOpenSignIn'
import Characteristic from 'components/Characteristic'

const Modal = dynamic(() => import('components/Modal'))

interface ReactionSupportProps {
  goal: GoalDto
  owner: UserBaseDto
}

export default function ReactionSupport({ goal, owner }: ReactionSupportProps): JSX.Element {
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
      <Characteristic tmpl="reaction" name="support" title={`Support ${owner.name}`} onClick={onClick} />
      {open && <Modal tmpl="support" goal={goal} owner={owner} onClose={toggleModal} />}
    </>
  )
}
