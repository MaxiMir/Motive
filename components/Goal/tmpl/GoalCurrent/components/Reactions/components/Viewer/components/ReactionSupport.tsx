import { useState } from 'react'
import dynamic from 'next/dynamic'
import { UserBaseDto } from 'dto'
import Characteristic from 'components/Characteristic'

const Modal = dynamic(() => import('components/Modal'))

interface ReactionSupportProps {
  owner: UserBaseDto
}

export default function ReactionSupport({ owner }: ReactionSupportProps): JSX.Element {
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Characteristic tmpl="reaction" name="support" title={`Support ${owner.name}`} onClick={toggleModal} />
      {open && <Modal tmpl="support" owner={owner} onClose={toggleModal} />}
    </>
  )
}
