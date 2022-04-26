import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { MessageDto } from 'dto'
import useLocale from 'hooks/useLocale'
import AppMenuButton from 'components/UI/AppMenuButton'
import i18n from './i18n'

const MenuList = dynamic(() => import('./components/MenuList'))
const ModalEditMessage = dynamic(() => import('components/Modal/ModalEditMessage'))

interface MenuProps {
  message: MessageDto
}

export default function Menu({ message }: MenuProps) {
  const { locale } = useLocale()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withModal, setWithModal] = useState(false)
  const { title, ariaControls } = i18n[locale]

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const toggleModal = () => {
    setWithModal(!withModal)
    onClose()
  }

  return (
    <>
      <AppMenuButton color="primary" ariaControls={ariaControls} title={title} compact onClick={onOpen} />
      {anchorEl && (
        <MenuList anchorEl={anchorEl} message={message} locale={locale} onOpenModal={toggleModal} onClose={onClose} />
      )}
      {withModal && <ModalEditMessage message={message} onClose={toggleModal} />}
    </>
  )
}
