import { useState } from 'react'
import dynamic from 'next/dynamic'
import { GoalDto, UserBaseDto } from 'dto'
import Characteristic from 'components/Characteristic'

const Modal = dynamic(() => import('components/Modal'))

interface ReactionSupportProps {
  goal: GoalDto
  owner: UserBaseDto
}

export default function ReactionSupport({ goal, owner }: ReactionSupportProps): JSX.Element {
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Characteristic tmpl="reaction" name="support" title={`Support ${owner.name}`} onClick={toggleModal} />
      {open && <Modal tmpl="support" goal={goal} owner={owner} onClose={toggleModal} />}
    </>
  )
}
