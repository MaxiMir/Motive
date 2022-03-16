import { useState } from 'react'
import dynamic from 'next/dynamic'
import { GoalDto, OwnershipDto } from 'dto'
import Action from 'components/Action'

const Modal = dynamic(() => import('components/Modal'))

interface LeaveProps {
  goal: GoalDto
  clientOwnership: OwnershipDto
}

export default function Leave({ goal, clientOwnership }: LeaveProps): JSX.Element {
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Action tmpl="goal" name="unsubscribe" active={false} title="Leave" onClick={toggleModal} />
      {open && <Modal tmpl="unsubscribe" goal={goal} clientOwnership={clientOwnership} onClose={toggleModal} />}
    </>
  )
}
