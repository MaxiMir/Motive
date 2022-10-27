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

export default function Menu({ message }: MenuProps) {
  const { formatMessage } = useIntl()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withModal, setWithModal] = useState(false)
  const title = formatMessage({ id: 'page.user.message-menu.title' })
  const ariaControls = formatMessage({ id: 'page.user.message-menu.aria-controls' })

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const toggleModal = () => {
    setWithModal(!withModal)
    onClose()
  }

  return (
    <>
      <AppMenuButton color="primary" ariaControls={ariaControls} title={title} compact onClick={onOpen} />
      {anchorEl && <MenuList anchorEl={anchorEl} message={message} onOpenModal={toggleModal} onClose={onClose} />}
      {withModal && <ModalEditMessage message={message} onClose={toggleModal} />}
    </>
  )
}
