import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { MessageDto } from '@features/topic'
import AppMenuButton from '@ui/AppMenuButton'
import { useMessages } from './hooks/useMessages'

const MenuList = dynamic(() => import('./components/MenuList'))
const EditMessageModal = dynamic(() => import('./components/EditMessageModal'))

interface MenuActionsProps {
  message: MessageDto
}

function MenuActions({ message }: MenuActionsProps) {
  const messages = useMessages()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [open, setOpen] = useState(false)

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const toggleModal = () => {
    setOpen(!open)
    onClose()
  }

  return (
    <>
      <AppMenuButton title={messages.title} color="primary" onClick={onOpen} />
      {anchorEl && (
        <MenuList
          anchorEl={anchorEl}
          message={message}
          onOpenModal={toggleModal}
          onClose={onClose}
        />
      )}
      {open && <EditMessageModal message={message} onClose={toggleModal} />}
    </>
  )
}

export default MenuActions
