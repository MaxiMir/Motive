import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { MessageDto } from '@dto'
import AppMenuButton from '@ui/AppMenuButton'

const MenuList = dynamic(() => import('./components/MenuList'))
const ModalEditMessage = dynamic(() => import('./components/ModalEditMessage'))

interface MenuProps {
  message: MessageDto
}

function Menu({ message }: MenuProps) {
  const { formatMessage } = useIntl()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [open, setOpen] = useState(false)
  const title = formatMessage({ id: 'page.user.message-menu.title' })
  const ariaControls = formatMessage({ id: 'page.user.message-menu.aria' })

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const toggleModal = () => {
    setOpen(!open)
    onClose()
  }

  return (
    <>
      <AppMenuButton title={title} color="primary" ariaControls={ariaControls} onClick={onOpen} />
      {anchorEl && <MenuList anchorEl={anchorEl} message={message} onOpenModal={toggleModal} onClose={onClose} />}
      {open && <ModalEditMessage message={message} onClose={toggleModal} />}
    </>
  )
}

export default Menu
