import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { MessageDto } from 'dto'
import AppMenuButton from 'components/UI/AppMenuButton'

const MenuList = dynamic(() => import('./components/MenuList'))
const Modal = dynamic(() => import('components/Modal'))

interface MenuProps {
  message: MessageDto
}

export default function Menu({ message }: MenuProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withModal, setWithModal] = useState(false)

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const toggleModal = () => {
    setWithModal(!withModal)
    onClose()
  }

  return (
    <>
      <AppMenuButton color="primary" ariaControls="message-menu" title="Open message menu" compact onClick={onOpen} />
      {anchorEl && <MenuList anchorEl={anchorEl} message={message} onOpenModal={toggleModal} onClose={onClose} />}
      {withModal && <Modal tmpl="edit-message" message={message} onClose={toggleModal} />}
    </>
  )
}
