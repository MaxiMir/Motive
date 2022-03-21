import { useState } from 'react'
import dynamic from 'next/dynamic'
import { UserBaseDto } from 'dto'
import AppIconButton from 'components/UI/AppIconButton'

const Modal = dynamic(() => import('components/Modal'))

interface EditProps {
  user: UserBaseDto
}

export default function Edit({ user }: EditProps): JSX.Element {
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <AppIconButton name="edit" title="Edit" onClick={toggleModal} />
      {open && <Modal tmpl="profile" user={user} onClose={toggleModal} />}
    </>
  )
}
