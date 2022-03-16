import { useState } from 'react'
import dynamic from 'next/dynamic'
import { GoalDto, OwnershipDto } from 'dto'
import Action from 'components/Action'

const Modal = dynamic(() => import('components/Modal'))

export interface MembershipLeaveProps {
  tmpl: 'leave'
  goal: GoalDto
  clientOwnership: OwnershipDto
}

export default function MembershipLeave({ goal, clientOwnership }: MembershipLeaveProps): JSX.Element {
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Action tmpl="goal" name="unsubscribe" active={false} title="Leave" onClick={toggleModal} />
      {open && <Modal tmpl="unsubscribe" goal={goal} clientOwnership={clientOwnership} onClose={toggleModal} />}
    </>
  )
}
